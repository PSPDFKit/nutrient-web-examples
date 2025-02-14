#!/bin/bash
# Runs npm/pnpm audit fix on all examples and outputs the result

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "\033[37;1mAuditing npm vulnerabilities in examples\033[0m\r"

for dir in examples/*; do
    if [ -d "$dir" ]; then

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

            if (( result > 0 )); then
                echo -e "  \033[31mRemaining: ${result}\033[0m"
            else
                echo -e "  \033[92;1mAll fixed!\033[0m"
            fi
        else
            echo -e "  \033[34mNo npm vulnerabilities found\033[0m"
        fi

        popd > /dev/null
    fi
done
