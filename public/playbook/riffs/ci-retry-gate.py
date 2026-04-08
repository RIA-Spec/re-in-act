RIFF_ID = "playbook.ci_retry_gate.v1"


async def run(inputs):
    log = inputs["log"]

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
        return await act("bash", data["retry_cmd"])

    if data["action"] == "escalate":
        return await act("notify", {"channel": "#build-failures", "message": data["reason"]})

    return {"status": "continue", "reason": data["reason"]}
