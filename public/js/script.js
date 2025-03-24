document.addEventListener("DOMContentLoaded", function () {
    const habitForm = document.getElementById("habit-form");
    const habitInput = document.getElementById("habit-name");
    const habitDescriptionInput = document.getElementById("habit-description");
    const habitFrequencyInput = document.getElementById("habit-frequency");
    const habitList = document.getElementById("habit-list");

    async function renderHabitList() {
        const response = await fetch('/habits'); 
        const habits = await response.json(); 
        console.log('Habits received from the server:', habits); 
        habitList.innerHTML = ''; 

        habits.forEach((habit) => {
            const li = document.createElement("li");
            li.classList.toggle("completed", habit.completed);

            li.innerHTML = `
                <strong>${habit.name}</strong><br>
                <em>${habit.description}</em><br>
                <span>Frequency: ${habit.frequency}</span>
            `;

            console.log('Habit-generated HTML:', li.innerHTML); 

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async () => {
                await fetch(`/habits/${habit.id}`, { method: 'DELETE' });
                renderHabitList();
            });

            li.appendChild(deleteButton); 
            habitList.appendChild(li); 
        });
    }

    habitForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const habitName = habitInput.value.trim();
        const habitDescription = habitDescriptionInput.value.trim();
        const habitFrequency = habitFrequencyInput.value;

        console.log('Data sent to the server:', {
            name: habitName,
            description: habitDescription,
            frequency: habitFrequency
        }); 

        if (habitName && habitDescription && habitFrequency) {
            await fetch('/habits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: habitName,
                    description: habitDescription,
                    frequency: habitFrequency
                })
            });
            habitInput.value = '';
            habitDescriptionInput.value = '';
            habitFrequencyInput.value = '';
            renderHabitList();
        }
    });

    renderHabitList();
});
