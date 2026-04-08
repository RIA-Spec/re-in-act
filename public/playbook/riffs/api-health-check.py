RIFF_ID = "playbook.api_health_check.v1"


async def run(inputs):
    html = inputs["api_reference_html"]

    cmd = await reason(
        "\n".join(
            [
                "Goal: extract the smallest executable health-check command from this API reference.",
                f"Observation:\n{html}",
                "Relevant context: the document may contain navigation, styling, examples for multiple endpoints, and unrelated prose.",
                "Constraints and rules: ignore markup noise, prefer a read-only endpoint, and return one direct shell command only.",
            ]
        ),
        {"cmd": "", "endpoint": "", "why": ""},
    )

    probe = await act("bash", cmd["data"]["cmd"])

    decision = await reason(
        "\n".join(
            [
                "Goal: decide whether the API health check passed.",
                f"Observation:\n{probe['content'][0]['text']}",
                f"Relevant context: the executed endpoint was {cmd['data']['endpoint']}.",
                "Constraints and rules: return passed plus a short grounded reason only.",
            ]
        ),
        {"passed": True, "reason": ""},
    )

    return {"probe": cmd["data"], "decision": decision["data"]}
