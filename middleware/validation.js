export function validateTask(req, res, next) {
const { title, priority, tags } = req.body;
if (!title || typeof title !== "string") {
return res.status(400).json({ message: "Title is required" });
}
if (priority && ![1,2,3].includes(Number(priority))) {
return res.status(400).json({ message: "Priority must be 1, 2, or 3" });
}
if (tags && !Array.isArray(tags)) {
return res.status(400).json({ message: "Tags must be an array" });
}
next();
}
