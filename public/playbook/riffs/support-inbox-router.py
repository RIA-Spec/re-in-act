RIFF_ID = "playbook.support_inbox_router.v1"


async def run(inputs):
    thread_text = inputs["thread_text"]
    account_tier = inputs["account_tier"]

    classification = await reason(
        "\n".join(
            [
                "Goal: classify this support thread and choose the next operational action.",
                f"Observation:\n{thread_text}",
                f"Relevant context: the customer account tier is {account_tier}.",
                "Constraints and rules: distinguish bug, billing, access, and general question; return one queue, one priority, and one safe next reply move.",
            ]
        ),
        {
            "queue": "bug",
            "priority": "normal",
            "reply_action": "send_ack",
            "reason": "",
        },
    )

    data = classification["data"]

    if data["reply_action"] == "send_ack":
        reply = await act(
            "reply_template",
            {"queue": data["queue"], "thread": thread_text, "priority": data["priority"]},
        )
        return {"classification": data, "reply": reply}

    if data["reply_action"] == "escalate":
        ticket = await act(
            "create_ticket",
            {
                "queue": data["queue"],
                "priority": data["priority"],
                "summary": data["reason"],
            },
        )
        return {"classification": data, "ticket": ticket}

    return {"classification": data}
