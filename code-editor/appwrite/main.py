import os
import json
import subprocess
import sys

# This Appwrite function will be executed every time your function is triggered
def main(context):
    request_body = json.loads(context.req.body_text)
    input_file_contents, expected_output_file_contents, user_code, runner_code = [request_body["inputFileContents"], request_body["outputFileContents"], request_body["userCode"], request_body["runnerCode"]]
    context.log("Context", request_body.keys())

    context.log("Running Python script...")
    
    with open("input.txt", "w") as file:
        file.write(input_file_contents)
        
    with open("expected_output.txt", "w") as file:
        file.write(expected_output_file_contents)

    with open("runner.py", "w") as file:
        file.write('''import signal

# Function for breaking out of recursive functions
def timeout(func, seconds=5):
    def handler(signum, frame):
        raise TimeoutError("Function execution timed out")

    def wrapper(*args, **kwargs):
        signal.signal(signal.SIGALRM, handler)
        signal.alarm(seconds)
        try:
            return func(*args, **kwargs)
        finally:
            signal.alarm(0)

    return wrapper

{user_code}
{runner_code}
'''.format(user_code=user_code, runner_code=runner_code))
    
    try:
        # Run the Python file and capture stdout and stderr
        result = subprocess.run(
            ["python", "./runner.py"],
            capture_output=True,
            text=True
        )
        context.log(result)
        
        # Return the stdout and stderr in the response
        return context.res.json({
            "success": True,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "exit_code": result.returncode
        })
    except Exception as e:
        # Handle any errors
        return context.res.json({
            "success": False,
            "error": str(e)
        }, 500)