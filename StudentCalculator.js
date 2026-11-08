
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function askGrade(subject) {
    while (true) {
        const input = await ask(`Enter ${subject} grade (0-100): `);
        const grade = Number(input);

        if (
            input.trim() !== "" &&
            Number.isFinite(grade) &&
            grade >= 0 &&
            grade <= 100
        ) {
            return grade;
        }

        console.log("Invalid grade. Enter a number from 0 to 100.");
    }
}

async function main() {
    console.log("================================");
    console.log("   STUDENT CALCULATOR SYSTEM");
    console.log("================================");

    const studentName = (await ask("Enter student name: ")).trim();

    if (studentName === "") {
        console.log("Student name cannot be empty.");
        rl.close();
        return;
    }

    const math = await askGrade("Mathematics");
    const english = await askGrade("English");
    const science = await askGrade("Science");
    const filipino = await askGrade("Filipino");
    const computer = await askGrade("Computer");

    const total = math + english + science + filipino + computer;
    const average = total / 5;
    const result = average >= 75 ? "PASS" : "FAIL";

    console.log("\n========== STUDENT REPORT ==========");
    console.log(`Student Name : ${studentName}`);
    console.log(`Mathematics  : ${math.toFixed(2)}`);
    console.log(`English      : ${english.toFixed(2)}`);
    console.log(`Science      : ${science.toFixed(2)}`);
    console.log(`Filipino     : ${filipino.toFixed(2)}`);
    console.log(`Computer     : ${computer.toFixed(2)}`);
    console.log("------------------------------------");
    console.log(`Total        : ${total.toFixed(2)}`);
    console.log(`Average      : ${average.toFixed(2)}`);
    console.log(`Final Result : ${result}`);
    console.log("====================================");

    rl.close();
}

main().catch((error) => {
    console.error("Something went wrong:", error.message);
    rl.close();
});
