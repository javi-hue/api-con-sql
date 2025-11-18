export function serializeTask(row) {
return {
id: row.id,
title: row.title,
description: row.description,
done: !!row.done,
priority: row.priority,
due_date: row.due_date,
tags: row.tags ? row.tags.split(',') : [],
user_id: row.user_id,
created_at: row.created_at
};
}
