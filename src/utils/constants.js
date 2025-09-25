export const UserRolesEnum = {
    ADMIN : "admin",
    PROJECT : "project_admin",
    MEMBER : "member"
}
export const AvailableUserRole = Object.values(UserRolesEnum)

export const TaskStatusEnum = {
    TODO : "todo",
    IN_PROGRESS : "in_progress",
    DONE: "done"
}

export const AvailableTaskStatues = Object.values(TaskStatusEnum);
