RIFF_ID = "playbook.ci_retry_gate.v1"


test_run = await act("bash", "npm test -- --reporter json")
log = test_run["content"][0]["text"]

decision = await reason(
    "\n".join(
        [
            "Goal: decide whether the current CI step should continue, retry, or escalate.",
            f"Observation:\n{log}",
            "Relevant context: the log may contain ANSI color, progress output, repeated stack traces, and partial retries.",
            "Constraints and rules: ignore cosmetic noise; return one action plus a short grounded reason and a concrete follow-up command when retry is needed.",
        ]
    ),
    {
        "action": "continue",
        "reason": "",
        "retry_cmd": "",
    },
)

data = decision["data"]

if data["action"] == "retry":
    retry_run = await act("bash", data["retry_cmd"])
    print(retry_run["content"][0]["text"])

elif data["action"] == "escalate":
    await act("notify", {"channel": "#build-failures", "message": data["reason"]})
    print(data["reason"])

else:
    print({"status": "continue", "reason": data["reason"]})
