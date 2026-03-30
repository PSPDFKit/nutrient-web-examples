#!/bin/bash
# Runs npm/pnpm audit fix on all examples and outputs the result

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Summary counters
total_found=0
total_fixed=0
total_remaining=0
total_examples=0
clean_examples=0
dirty_examples=()

echo -e "\033[37;1mAuditing npm vulnerabilities in examples\033[0m\r"

for dir in examples/*; do
    if [ -d "$dir" ]; then
        ((total_examples++))

        echo -e "\n\033[34;1m* $dir:\033[0m"

        pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

        result=0
        initialresult=0

        if [ -f "pnpm-lock.yaml" ]; then
            # Check if the 'total' field exists and extract it if present
            initialresult=$(pnpm audit --json | jq -r '.metadata.vulnerabilities.total // 0')

            pnpm audit fix > /dev/null

            # Capture vulnerabilities metadata using pnpm
            result=$(pnpm audit --json | jq -r '.metadata.vulnerabilities.total // 0')
        elif [ -f "package-lock.json" ]; then
            # Capture vulnerabilities metadata using npm
            initialresult=$(npm audit --json | jq -r '.metadata.vulnerabilities.total // 0')

            npm audit fix > /dev/null

            # Capture vulnerabilities metadata using npm
            result=$(npm audit --json | jq -r '.metadata.vulnerabilities.total // 0')
        fi

        # If vulnerabilities were found, output the result

        if (( initialresult > 0 )); then
            ((fixed = initialresult - result))
            echo -e "  \033[93mFound:     ${initialresult}\033[0m"
            echo -e "  \033[92mFixed:     $fixed\033[0m"

            ((total_found += initialresult))
            ((total_fixed += fixed))

            if (( result > 0 )); then
                echo -e "  \033[31mRemaining: ${result}\033[0m"
                ((total_remaining += result))
                dirty_examples+=("$dir (${result} remaining)")
            else
                echo -e "  \033[92;1mAll fixed!\033[0m"
                ((clean_examples++))
            fi
        else
            echo -e "  \033[34mNo npm vulnerabilities found\033[0m"
            ((clean_examples++))
        fi

        popd > /dev/null
    fi
done

# ── Summary ──────────────────────────────────────────────────────────
echo -e "\n\033[37;1m════════════════════════════════════════\033[0m"
echo -e "\033[37;1m  Summary\033[0m"
echo -e "\033[37;1m════════════════════════════════════════\033[0m"
echo -e "  Examples scanned:  ${total_examples}"
echo -e "  \033[92mVulns fixed:       ${total_fixed}\033[0m"
echo -e "  \033[31mVulns remaining:   ${total_remaining}\033[0m"
echo -e "  \033[92mClean examples:    ${clean_examples}/${total_examples}\033[0m"

if (( ${#dirty_examples[@]} > 0 )); then
    echo -e "\n  \033[31;1mExamples with unresolved vulnerabilities:\033[0m"
    for entry in "${dirty_examples[@]}"; do
        echo -e "    \033[31m• ${entry}\033[0m"
    done
else
    echo -e "\n  \033[92;1m✓ All examples are vulnerability-free!\033[0m"
fi
echo ""
