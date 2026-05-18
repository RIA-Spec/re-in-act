async function delegatedTask(maxAttempts = 3, maxSteps = 40) {
  for (let i = 1; i <= maxAttempts; i++) {
    const r = await agent(goal, { budget: { maxSteps } });

    if (r.error) {
      const v = await reason(goal, { observation: r.error });
      if (v.action === "retry") continue;
      return { status: "escalate", reason: v.reason };
    }

    const traj = extractTrajectory(r);
    const v = await reason(goal, { observation: r.data.text, trajectory: traj });

    if (v.action === "done") return v.data;
    if (v.action === "continue") continue;
    return { status: "escalate", reason: v.reason };
  }
}
