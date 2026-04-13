#!/bin/bash
# Runs npm/pnpm audit fix on all examples and outputs the result

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "\033[37;1mAuditing npm vulnerabilities in examples\033[0m\r"

vuln_dirs=()
vuln_counts=()
vuln_severities=()

for dir in examples/*; do
    if [ -d "$dir" ]; then

        echo -e "\n\033[34;1m* $dir:\033[0m"

        pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

        result=0
        initialresult=0

        if [ -f "pnpm-lock.yaml" ]; then
            initialresult=$(pnpm audit --json | jq -r '.metadata.vulnerabilities.total // 0')

            pnpm audit fix > /dev/null

            audit_json=$(pnpm audit --json)
            result=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.total // 0')
        elif [ -f "package-lock.json" ]; then
            initialresult=$(npm audit --json | jq -r '.metadata.vulnerabilities.total // 0')

            npm audit fix > /dev/null

            audit_json=$(npm audit --json)
            result=$(echo "$audit_json" | jq -r '.metadata.vulnerabilities.total // 0')
        fi

        if (( initialresult > 0 )); then
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

if [ ${#vuln_dirs[@]} -eq 0 ]; then
    echo -e "\033[92;1mAll examples are vulnerability-free!\033[0m"
else
    total_remaining=0
    for i in "${!vuln_dirs[@]}"; do
        echo -e "  \033[31m${vuln_dirs[$i]}: ${vuln_counts[$i]} vulnerabilities\033[0m (${vuln_severities[$i]})"
        ((total_remaining += vuln_counts[$i]))
    done
    echo -e "\n  \033[31;1m${#vuln_dirs[@]} example(s) with ${total_remaining} total remaining vulnerabilities\033[0m"
fi
