# NOTE
# to make this script work you should:
# - have python3 installed
# - run `chmod +x run_locally.sh` to make the script executable

echo "> http://localhost:8080"

open "http://localhost:8080"

python3 -m http.server 8080