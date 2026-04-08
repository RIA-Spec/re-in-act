RIFF_ID = "playbook.support_inbox_router.v1"


thread_text = "Customer: I lost access after billing updated and now the dashboard shows a permissions error."
account_tier = "enterprise"

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
    print({"classification": data, "reply": reply})

elif data["reply_action"] == "escalate":
    ticket = await act(
        "create_ticket",
        {
            "queue": data["queue"],
            "priority": data["priority"],
            "summary": data["reason"],
        },
    )
    print({"classification": data, "ticket": ticket})

else:
    print({"classification": data})
