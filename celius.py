                 #WELCOME TO MY CELSIUS TP FAHRENHEIT AND FAHRENHEIT TO CELSIUS CONVERTER 
                #BUILD WITH SIMPLE LOGIC , AND FORMULA FOR CONVERSION 
                                                                       #BY-Mosin ali


class Task:
    def __init__(self, title, description, start_date, end_date):
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date

    def __str__(self):
        return f"{self.title}|{self.description}|{self.start_date}|{self.end_date}"


def load_tasks(filename):
    tasks = []
    try:
        with open(filename, 'r') as file:
            for line in file:
                title, description, start_date, end_date = line.strip().split('|')
                tasks.append(Task(title, description, start_date, end_date))
    except FileNotFoundError:
        print("No previous tasks found. Starting fresh.")
    return tasks


def save_tasks(tasks, filename):
    with open(filename, 'w') as file:
        for task in tasks:
            file.write(str(task) + '\n')


def create_task(tasks):
    title = input("Enter task title: ").strip()
    description = input("Enter task description: ").strip()
    start_date = input("Enter task start date (YYYY-MM-DD): ").strip()
    end_date = input("Enter task end date (YYYY-MM-DD): ").strip()
    tasks.append(Task(title, description, start_date, end_date))
    print("Task created successfully!")
    save_tasks(tasks, 'tasks.txt')


def view_tasks(tasks):
    if not tasks:
        print("No tasks available.")
    else:
        for i, task in enumerate(tasks, start=1):
            print(f"\nTask {i}: {task.title} - {task.description} (Start: {task.start_date}, End: {task.end_date})")


def update_task(tasks):
    if not tasks:
        print("No tasks to update.")
    else:
        view_tasks(tasks)
        try:
            task_number = int(input("Enter the task number to update: ")) - 1
            if 0 <= task_number < len(tasks):
                task = tasks[task_number]
                task.title = input(f"Enter new title (current: {task.title}): ").strip()
                task.description = input(f"Enter new description (current: {task.description}): ").strip()
                task.start_date = input(f"Enter new start date (current: {task.start_date}): ").strip()
                task.end_date = input(f"Enter new end date (current: {task.end_date}): ").strip()
                save_tasks(tasks, 'tasks.txt')
                print("Task updated successfully!")
            else:
                print("Invalid task number.")
        except ValueError:
            print("Please enter a valid number.")


def delete_task(tasks):
    if not tasks:
        print("No tasks to delete.")
    else:
        view_tasks(tasks)
        try:
            task_number = int(input("Enter the task number to delete: ")) - 1
            if 0 <= task_number < len(tasks):
                tasks.pop(task_number)
                save_tasks(tasks, 'tasks.txt')
                print("Task deleted successfully!")
            else:
                print("Invalid task number.")
        except ValueError:
            print("Please enter a valid number.")


def show_menu():
    tasks = load_tasks('tasks.txt')

    while True:
        print("\n--- Task Manager ---")
        print("1. Create a new task")
        print("2. View all tasks")
        print("3. Update a task")
        print("4. Delete a task")
        print("5. Exit")
        
        choice = input("Choose an option: ").strip()
        if choice == '1':
            create_task(tasks)
        elif choice == '2':
            view_tasks(tasks)
        elif choice == '3':
            update_task(tasks)
        elif choice == '4':
            delete_task(tasks)
        elif choice == '5':
            print("Exiting Task Manager. Goodbye!")
            break
        else:
            print("Invalid choice. Please select a valid option.")

show_menu()

#THANKYOU 
