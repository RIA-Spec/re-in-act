# Re in Act

<p>
	<img src="./src/app/icon.svg" alt="Re in Act logo" width="160" />
</p>

Re in Act is an open specification for AI agents built around a simple claim: useful reasoning should stay close to action.

Website: https://re-in-act.org

Instead of repeatedly bouncing back to an outer `reason()` loop, Re in Act defines a **Reason-able Action Space (RAS)** where local judgment happens inside execution. The goal is not more chain-of-thought overhead, but a tighter control model for agents that need to act reliably in real environments.

## Core Idea

Re in Act treats agent behavior as structured action rather than open-ended outer-loop deliberation. High-level reasoning defines the workspace, but local adaptation happens within the action itself. That shift is meant to make agents easier to control, easier to inspect, and less dependent on repeated model round trips.

## Main Characteristics

- **Reason in action** — local decisions happen inside the action phase, not only before it.
- **Deterministic control flow** — agent execution stays closer to explicit state transitions and bounded behavior.
- **Fewer round trips** — less dependence on repeatedly re-entering a top-level planner.
- **Clear action spaces** — the specification emphasizes constrained, legible interfaces for execution.
- **Inspectable behavior** — the model is designed to make agent behavior easier to analyze and debug.

## Repository

This repository contains the Re in Act documentation site and working specification drafts. For contribution and website development details, see `docs/community/contributing.mdx`.

## Citation

If you cite this working draft in academic or technical writing, cite the specification page:

```bibtex
@misc{ria_spec_re_in_act_2026,
	author = {{RIA-Spec}},
	title = {{Re in Act -- Specification}},
	year = {2026},
	url = {https://re-in-act.org/specification/draft/index},
	note = {Working draft, dated 2026-04-19}
}
```

## License

- Code: Apache-2.0 (see `public/LICENSE`)
- Documentation/spec: CC BY 4.0 (see `public/LICENSE-DOCS`)
