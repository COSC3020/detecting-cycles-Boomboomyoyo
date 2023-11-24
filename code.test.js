const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');


class Graph {
	constructor(V) {
		this.V = V; // number of vertices
		this.adj = new Array(V).fill(null).map(() => []); // adjacency list
	}

	addEdge(v, w) {
		this.adj[v].push(w);
	}

	isCyclic() {
		const inDegree = new Array(this.V).fill(0); // stores in-degree of each vertex
		const q = []; // queue to store vertices with 0 in-degree
		let visited = 0; // count of visited vertices

		// calculate in-degree of each vertex
		for (let u = 0; u < this.V; u++) {
			for (let v of this.adj[u]) {
				inDegree[v]++;
			}
		}

		// enqueue vertices with 0 in-degree
		for (let u = 0; u < this.V; u++) {
			if (inDegree[u] === 0) {
				q.push(u);
			}
		}

		// BFS traversal
		while (q.length > 0) {
			const u = q.shift();
			visited++;

			// reduce in-degree of adjacent vertices
			for (let v of this.adj[u]) {
				inDegree[v]--;
				// if in-degree becomes 0, enqueue the vertex
				if (inDegree[v] === 0) {
					q.push(v);
				}
			}
		}

		return visited !== this.V; // if not all vertices are visited, there is a cycle
	}
}

const test =
    jsc.forall("nat", function(int) {
        graph = connectedGraph(Math.max(int, 2))
        adjGraph = convertToAdjList(graph)
        graphTest = new Graph(Math.max(int, 2))
        for(i = 0; i < adjGraph.length; i++)
        {
            for(j = 0; j < adjGraph.length; j++)
            {
                graphTest.addEdge(i, adjGraph[i][j])
            }
        }
        return graphTest.isCyclic() == hasCycle(adjGraph)
    });
jsc.assert(test, { tests: 1000 });



function connectedGraph(v)
{
    graph = []
    for(i=0; i < v; i++)
    {
        graph.push([])
        for(j=0; j < v; j++)
        {
            graph[i].push(0)
        }
    }
    edges = Math.max(Math.floor(v*(Math.random()*(v))),v-1)
    return connectedGraph2(v, edges, graph)
}

function connectedGraph2(v, e, graph, connectedNodes = [0])
{
    while(e > v-connectedNodes.length)
    {
        n1 = randomElementRange(connectedNodes.length)
        n1 = connectedNodes[n1]
        n2 = randomElementRange(v)
        unplaced = true
        while(unplaced)
        {
            if(graph[n1][n2] == 0)
            {
                graph[n1][n2] = 1
                e -=1    
                if(!connectedNodes.includes(n2))
                {
                    connectedNodes.push(n2)
                }
                unplaced = false
            } else if(n2 < graph[n1].length)
            {
                n2 += 1
            } else if(n2 >= graph[n1].length-1)
            {
                if(n1 == graph.length - 1)
                {
                    n1 = 0
                    n2 = 0
                } else
                {
                    n2 = 0
                    n1 += 1
                }
            }
        }
    }
    if(e > 0)
    {
        for(i = 0; i < v; i++)
        {
            if(!connectedNodes.includes(i))
            {
                n1 = Math.max(Math.floor(Math.random()*(connectedNodes.length))-1,0)
                n1 = connectedNodes[n1]
                graph[n1][i] = 1
                e -= 1
                connectedNodes.push(i)
            }   
        }
    }
    return graph
}

function randomElementRange(n) 
{
    return Math.floor(Math.random()*n)
}