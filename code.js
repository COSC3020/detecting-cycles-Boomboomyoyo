function hasCycle(graph)
{
    flag = false
    for(let i = 0; i < graph.length && !flag; i++)
    {
        flag = cycleChecker(graph, i)
    }
    return flag
}

function cycleChecker(graph, startNode, currentNode = startNode, visitedNodes = new Array(graph.length))
{
    if(visitedNodes[0] == undefined)
    {
        for(i = 0; i < visitedNodes.length; i++)
        {
            visitedNodes[i] = false
        }
    }
    for(let i = 0; i < graph[currentNode].length; i++)
    {
        if(graph[currentNode][i] == startNode)
        {
            return true
        }
        if(!visitedNodes[graph[currentNode][i]])
        {
            visitedNodes[graph[currentNode][i]] = true
            flag = cycleChecker(graph, startNode, graph[currentNode][i], visitedNodes)
            if(flag)
            {
                return true
            } else
            {
                visitedNodes[graph[currentNode][i]] = false
            }
        } else
        {
            return true
        }
    }
    return false
}

function convertToAdjList(adjMatrix) {
    dimensions = adjMatrix.length
    adjList = []
    for(i=0; i < dimensions; i++)
    {
        adjList.push([])
        for(j=0; j < dimensions; j++)
        {
            if(adjMatrix[i][j] == 1)
            {
                adjList[i].push(j)
            }
        }
    }
    return adjList;
}

/*console.log(isCyclic(
    [ [ 0, 0, 1 ], [ 0, 0, 0 ], [ 1, 1, 0 ] ]
    ))*/