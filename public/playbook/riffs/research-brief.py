RIFF_ID = "playbook.research_brief.v1"


async def run(inputs):
    topic = inputs["topic"]
    urls = inputs["urls"]
    extracted = []

    for url in urls:
        page = await act("webfetch", {"url": url})
        facts = await reason(
            "\n".join(
                [
                    f"Goal: extract only decision-relevant facts about {topic} from this source.",
                    f"Observation:\n{page['content'][0]['text']}",
                    f"Relevant context: the source URL is {url}.",
                    "Constraints and rules: ignore boilerplate, ads, and repeated navigation; return claims with evidence and uncertainty.",
                ]
            ),
            {"claims": [{"fact": "", "evidence": "", "confidence": "high"}]},
        )
        extracted.append({"url": url, "claims": facts["data"]["claims"]})

    brief = await reason(
        "\n".join(
            [
                f"Goal: synthesize a concise research brief about {topic}.",
                f"Observation:\n{extracted}",
                "Constraints and rules: preserve disagreements, keep only the strongest evidence, and return a short brief plus open questions.",
            ]
        ),
        {"brief": "", "open_questions": [""], "sources": [""]},
    )

    await act(
        "write_file",
        {"path": f"research-brief-{topic}.json", "content": brief["data"]},
    )

    return brief["data"]
