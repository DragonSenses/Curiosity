# Why?

I wanted to collect a set of programming problems because it stimulates my interest and awakens my curiosity. It also helps me hone my analytical, problem-solving skills. It also helps refresh my knowledge on topics such as data structures and algorithms. It helps me articulate my thought process and approaches to problems, while helping me identify errors or reasonings. Most importantly, it helps me able to abstract away the details to simplify large concepts which leads to greater understanding.

- *To abstract (away)*, specifically in computer science, refers to intentionally obscuring the details of how something works in order to simplify things conceptually.
- Abstract thinking is a cognitive process that allows us to think beyond observable information and deal with concepts, ideas, theories, and principles. By thinking outside of our existing knowledge, we can come up with solutions that aren't immediately obvious. [Source: able.ac](https://able.ac/blog/what-is-abstract-thinking/)
- Abstraction is a process wherein general rules and concepts are derived from the usage and classification of specific examples, literal signifiers, first principles, or other methods. [Abstraction | Wikipedia](https://en.wikipedia.org/wiki/Abstraction)

# LeetCode

[LeetCode](https://leetcode.com/)

What is LeetCode?

- **LeetCode** is a tech skills and interview preparation platform students, professional programmers, and employers use to learn, practice, and assess coding and programming skills.

**LeetCode** is a valuable resource for enhancing your coding skills and preparing for technical interviews. It provides a platform where you can practice solving algorithmic problems, improve your problem-solving abilities, and gain familiarity with common coding patterns. Here are some aspects to consider:

1. **Problem Solving**: LeetCode offers a wide range of coding challenges categorized by difficulty level. By solving these problems, you can sharpen your analytical thinking and algorithmic skills.

2. **Interview Preparation**: Many tech companies use similar problem-solving formats during technical interviews. LeetCode helps you become comfortable with these types of questions, making you better prepared for real-world interviews.

3. **Data Structures and Algorithms**: LeetCode covers various data structures (such as arrays, linked lists, trees, graphs) and algorithms (sorting, searching, dynamic programming). Mastering these concepts is crucial for technical roles.

4. **Job Readiness**: While LeetCode is an excellent tool for interview preparation, it's essential to complement it with other skills. Understanding system design, databases, and software engineering principles is equally important.

5. **Real Interview Questions**: LeetCode often features real interview questions that have been asked by tech companies. Solving these gives you a taste of what to expect during interviews.

Remember that LeetCode alone doesn't guarantee job readiness. It's part of a broader learning process. Combine it with practical projects, open-source contributions, and soft skills to enhance your overall job readiness. 

## Reasons to practice

1. **Technical Interview Preparation**:
   - LeetCode offers a vast collection of authentic company interview questions. By solving these problems, you can become well-prepared for technical interviews.
   - Many tech companies use similar problem-solving formats during interviews, making LeetCode an excellent resource to practice and refine your skills.

2. **Algorithmic Fundamentals**:
   - LeetCode covers a wide range of topics related to data structures (arrays, linked lists, trees, graphs) and algorithms (sorting, searching, dynamic programming).
   - Mastering these concepts is crucial for success in technical roles.

3. **Problem-Solving Practice**:
   - Regularly solving LeetCode problems helps you stay sharp and maintain your algorithmic knowledge.
   - It's an opportunity to refresh your understanding of fundamental algorithms and data structures.

4. **Language Proficiency**:
   - LeetCode allows you to practice coding in various programming languages.
   - If you're learning a new language, LeetCode can be a fun way to apply your knowledge and improve your proficiency.

5. **New Challenges and Approaches**:
   - LeetCode exposes you to diverse problem scenarios and novel ways of solving them.
   - Even if you don't get a question right, articulating your thought process and approach during interviews is valuable.

6. **Industry Expectations**:
   - Some companies consider LeetCode performance as a measure of a candidate's coding abilities.
   - While it's not the sole indicator, being comfortable with LeetCode-style problems can boost your chances.

LeetCode complements other skills like system design, software engineering principles, and practical projects. It's a valuable tool, but not the only one.

### Abstract away

- [what does "abstract away from" mean? | English language learners stack exchange](https://ell.stackexchange.com/questions/89687/what-does-abstract-away-from-mean)

This response to the question of what "abstract away" means is brilliant, so I'd like to reiterate here for posterity:

Q: I'm reading a technical book about programming and I came across on this sentence,

> "A dependency abstracts functionality away from calling code. You don't need to worry too much about what a dependency is doing, much less how it is doing it, but you should ensure that all dependencies are correctly managed."

I did not quite get the sentence. Can anyone explain me this?

A: 

*To abstract (away)*, specifically in computer science, refers to intentionally obscuring the details of how something works in order to simplify things conceptually. Something is abstracted when it acts as a "[black box](https://en.wikipedia.org/wiki/Black_box)": We put some input into the box, and get some output from the box, but we can't see the inner workings inside the box. Abstraction typically happens in layers, i.e. some system of black boxes become the inner workings of a black box at a higher level of abstraction.

For example, consider what happens when I press a key and a letter appears on the screen. The details of how this happens are quite complex: pressing the key connects a circuit that causes a specific electronic signal to be sent to the computer, that signal is interpreted by hardware drivers and directed by the operating system into Google Chrome, which receives it as a sequence of bits which are handled by various functions in Chrome's code. Then there's a separate driver for the monitor, and so on. An abstract way of describing this is as follows: I press a key on my keyboard, and the corresponding letter appears on the screen.

The reason why this is conceptually useful in computer science is because computer systems and software can be incredibly complex. Nested black boxes are the conceptual building blocks of computer science because they allow you to choose your own level of detail. Need more detail? Open up the box and look inside. Too much detail? Abstract it away by putting everything in an even larger box.

**How does this work with dependencies in particular?**

One of the main ways of actually abstracting something is by encapsulating a piece of functionality in a class, method, routine, module, etc. that can be referenced by other areas of code. When a reference is established, the referencer becomes dependent on the referenced code. All the referencer can do is interact with the referenced code as a black box: giving it an input and receiving an output, but never having access to the inner workings. 

See [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).