#!/bin/bash
# Runs npm/pnpm audit fix on all examples and outputs the result

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "\033[37;1mAuditing npm vulnerabilities in examples\033[0m\r"

vuln_dirs=()
vuln_counts=()
vuln_severities=()
error_dirs=()

# npm reports `.metadata.vulnerabilities.total`; pnpm omits it and only emits the
# per-severity buckets. Derive the total from those buckets when it is absent so
# a pnpm example isn't misreported as un-auditable. Erroring out on a missing or
# non-object `vulnerabilities` keeps genuine registry failures distinguishable
# from a clean audit.
audit_total_filter='.metadata.vulnerabilities
    | if type != "object" then error("no audit metadata") else . end
    | .total // ([.info, .low, .moderate, .high, .critical] | map(. // 0) | add)'

for dir in examples/*; do
    if [ -d "$dir" ]; then

        echo -e "\n\033[34;1m* $dir:\033[0m"

        pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

        result=0
        initialresult=0
        audit_error=0
        has_lockfile=0

        if [ -f "pnpm-lock.yaml" ]; then
            has_lockfile=1
            initial_json=$(pnpm audit --json 2>/dev/null)
            # pnpm 11 writes fixes to pnpm-workspace.yaml when using the override
            # method. The install applies those overrides to the lockfile and
            # node_modules.
            pnpm audit --fix=override > /dev/null 2>&1
            pnpm install --no-frozen-lockfile > /dev/null 2>&1
            audit_json=$(pnpm audit --json 2>/dev/null)
        elif [ -f "package-lock.json" ]; then
            has_lockfile=1
            initial_json=$(npm audit --json 2>/dev/null)
            npm audit fix > /dev/null 2>&1
            audit_json=$(npm audit --json 2>/dev/null)
        fi

        if (( has_lockfile )); then
            # jq -e exits non-zero when the audit output is missing or unparseable
            # (e.g. the registry returning an HTTP error). Guarding here avoids the
            # previous `// 0` fallback, which silently reported a failed audit as
            # "no vulnerabilities found".
            initialresult=$(printf '%s' "$initial_json" | jq -e -r "$audit_total_filter" 2>/dev/null) || audit_error=1
            result=$(printf '%s' "$audit_json" | jq -e -r "$audit_total_filter" 2>/dev/null) || audit_error=1
        fi

        if (( audit_error )); then
            echo -e "  \033[91mAudit could not complete\033[0m (registry endpoint error — result unknown)"
            error_dirs+=("$dir")
        elif (( initialresult > 0 )); then
            ((fixed = initialresult - result))
            echo -e "  \033[93mFound:     ${initialresult}\033[0m"
            echo -e "  \033[92mFixed:     $fixed\033[0m"

            if (( result > 0 )); then
                sev_info=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.info // 0')
                sev_low=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.low // 0')
                sev_moderate=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.moderate // 0')
                sev_high=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.high // 0')
                sev_critical=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.critical // 0')

                severity_parts=()
                [ "$sev_critical" -gt 0 ] && severity_parts+=("\033[91m${sev_critical} critical\033[0m")
                [ "$sev_high" -gt 0 ] && severity_parts+=("\033[31m${sev_high} high\033[0m")
                [ "$sev_moderate" -gt 0 ] && severity_parts+=("\033[33m${sev_moderate} moderate\033[0m")
                [ "$sev_low" -gt 0 ] && severity_parts+=("\033[36m${sev_low} low\033[0m")
                [ "$sev_info" -gt 0 ] && severity_parts+=("\033[37m${sev_info} info\033[0m")

                severity_str=""
                for j in "${!severity_parts[@]}"; do
                    [ "$j" -gt 0 ] && severity_str+=", "
                    severity_str+="${severity_parts[$j]}"
                done

                echo -e "  \033[31mRemaining: ${result}\033[0m (${severity_str})"
                vuln_dirs+=("$dir")
                vuln_counts+=("$result")
                vuln_severities+=("${severity_str}")
            else
                echo -e "  \033[92;1mAll fixed!\033[0m"
            fi
        else
            echo -e "  \033[34mNo npm vulnerabilities found\033[0m"
        fi

        popd > /dev/null
    fi
done

# Print final summary
echo -e "\n\033[37;1m──────────────────────────────────────\033[0m"
echo -e "\033[37;1mSummary\033[0m"
echo -e "\033[37;1m──────────────────────────────────────\033[0m"

if [ ${#vuln_dirs[@]} -eq 0 ] && [ ${#error_dirs[@]} -eq 0 ]; then
    echo -e "\033[92;1mAll examples are vulnerability-free!\033[0m"
elif [ ${#vuln_dirs[@]} -eq 0 ]; then
    echo -e "\033[92mNo remaining vulnerabilities found.\033[0m"
else
    total_remaining=0
    for i in "${!vuln_dirs[@]}"; do
        echo -e "  \033[31m${vuln_dirs[$i]}: ${vuln_counts[$i]} vulnerabilities\033[0m (${vuln_severities[$i]})"
        ((total_remaining += vuln_counts[$i]))
    done
    echo -e "\n  \033[31;1m${#vuln_dirs[@]} example(s) with ${total_remaining} total remaining vulnerabilities\033[0m"
fi

if [ ${#error_dirs[@]} -gt 0 ]; then
    echo -e "\n  \033[91;1m${#error_dirs[@]} example(s) could not be audited (registry endpoint error):\033[0m"
    for d in "${error_dirs[@]}"; do
        echo -e "  \033[91m${d}\033[0m"
    done
fi
