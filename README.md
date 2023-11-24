[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13004434&assignment_repo_type=AssignmentRepo)
# Detecting Cycles in Graphs

Kruskal's Algorithm adds edges to the minimum spanning tree, unless they would
add a cycle. In the lectures, we did not talk about how to do this -- you're
going to implement a function to detect cycles in a graph. Start with the
template I provided in `code.js`. You can use any data structures (i.e. any
graph representation) you like. The function should return `true` or `false`,
depending on whether the given graph contains a cycle or not.

I have not provided any test code; you can base yours on test code from other
exercises.

## Runtime Analysis

What is the worst-case big $\Theta$ complexity of your implementation? Add your
answer, including your reasoning, to this markdown file.

# Response
A good chunk of the I spent on this was trying to adapt test code to work instead finding a different set of test code to use. Eventually, I gave up, scrolled down, and it took 30 seconds to get the other set of test code on the site to work. I could've saved myself a lot of time.

## Runtime Analysis
Here are the steps my algorithm uses:
1. Check for cycles starting from each node. Order $|V|$ time
2. Iterate over each edge connected to start node. If there is an unvisited node connected to this node, repeat this step for it, then mark it visited.

More or less, this comes down to the same asymptotic complexity as other exercises of $|V+E|$, but I do it from each start node, so that is a total complexity of $\Theta\left(|V^2+V*E|\right)$. I did it this way to account for unconnected graphs as well as connected graphs. I could make this more efficient with memoization, so I don't start in subgraphs that have already been checked for cycles, but I am ready to move on to other exercises, so I will leave this here, I think.

## References
Used the code from the second section of this as test code.
https://www.geeksforgeeks.org/detect-cycle-in-a-graph/
