const ALL_SUBJECTS = [
  // Technical Subjects
  {
    name: "Data Structures and Algorithms (DSA)",
    category: "Technical",
    topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Binary Trees", "Binary Search Trees", "Graphs", "Sorting & Searching", "Dynamic Programming", "Recursion & Backtracking"]
  },
  {
    name: "Database Management Systems (DBMS)",
    category: "Technical",
    topics: ["Relational Model", "Normalization", "ACID Properties", "Transactions & Concurrency", "Indexing", "ER Modeling", "Deadlocks in DB"]
  },
  {
    name: "Operating Systems (OS)",
    category: "Technical",
    topics: ["Process Management", "CPU Scheduling", "Process Synchronization", "Deadlocks", "Memory Management & Paging", "Virtual Memory", "Disk Scheduling"]
  },
  {
    name: "Computer Networks (CN)",
    category: "Technical",
    topics: ["OSI Model", "TCP/IP Architecture", "Transport Protocols (TCP/UDP)", "IP Addressing & Subnetting", "Routing Algorithms", "Application Protocols (HTTP, DNS)"]
  },
  {
    name: "Object-Oriented Programming (OOPs)",
    category: "Technical",
    topics: ["Encapsulation & Abstraction", "Inheritance & Virtual Functions", "Polymorphism", "Interfaces & Abstract Classes", "SOLID Principles", "Design Patterns"]
  },
  {
    name: "Programming Fundamentals",
    category: "Technical",
    topics: ["C Language Pointers & Memory", "C++ References & STL", "Java Memory & Garbage Collection", "Python Data Structures & Scope", "Type Systems & Operators"]
  },
  {
    name: "SQL",
    category: "Technical",
    topics: ["Basic Queries (SELECT, WHERE, ORDER BY)", "Aggregations & GROUP BY", "JOIN Operations", "Subqueries & Nested Queries", "Constraints & Keys", "Window Functions"]
  },
  {
    name: "Web Development",
    category: "Technical",
    topics: ["Semantic HTML & Accessibility", "CSS Box Model & Flexbox/Grid", "JavaScript Event Loop & Async", "DOM Manipulation", "REST API Concepts & HTTP Methods", "Browser Storage & Cookies"]
  },
  {
    name: "Coding and Debugging",
    category: "Technical",
    topics: ["Output Prediction", "Off-by-One & Index Errors", "Pointer & Memory Leaks", "Infinite Loops & Recursion", "Scope & Shadowing Bugs"]
  },
  // Aptitude Subjects
  {
    name: "Quantitative Aptitude",
    category: "Aptitude",
    topics: ["Percentages & Profit-Loss", "Time, Speed & Distance", "Time & Work", "Ratio & Proportion", "Simple & Compound Interest", "Permutation & Combination", "Probability"]
  },
  {
    name: "Logical Reasoning",
    category: "Aptitude",
    topics: ["Number & Letter Series", "Coding-Decoding", "Blood Relations", "Direction Sense", "Seating Arrangements", "Syllogisms", "Data Sufficiency"]
  },
  {
    name: "Verbal Ability",
    category: "Aptitude",
    topics: ["Sentence Correction & Grammar", "Vocabulary (Synonyms & Antonyms)", "Reading Comprehension", "Sentence Completion", "Para Jumbles", "Idioms & Phrases"]
  },
  {
    name: "Communication Skills",
    category: "Aptitude",
    topics: ["Email & Professional Writing", "STAR Method for Behavioral Interviews", "Active Listening & Conflict Resolution", "Group Discussion Strategies", "Non-Verbal & Body Language"]
  }
];
const initialQuestionBank = [
  // ==========================================
  // 1. DATA STRUCTURES AND ALGORITHMS (16 Questions)
  // ==========================================
  {
    id: "dsa-01",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Arrays",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the time complexity to access an element in an array by its index in memory?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n\xB2)"],
    correctAnswer: 0,
    explanation: "Arrays store contiguous memory blocks. The address is calculated directly via Base_Address + (index * element_size), which is an O(1) constant-time arithmetic operation.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "dsa-02",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Linked Lists",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which of the following is an advantage of a Doubly Linked List over a Singly Linked List?",
    options: [
      "It consumes less memory per node",
      "It allows traversal in both forward and backward directions",
      "It provides O(1) random access by numeric index",
      "It eliminates the need for pointers completely"
    ],
    correctAnswer: 1,
    explanation: 'A Doubly Linked List stores both "next" and "prev" pointers, allowing bidirectional traversal and efficient O(1) deletion when given a direct reference to the node.',
    companyTags: ["Cognizant", "Accenture"]
  },
  {
    id: "dsa-03",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Stacks & Queues",
    difficulty: "beginner",
    type: "code_output",
    question: "What is the output after executing these stack operations: push(10), push(20), pop(), push(30), push(40), pop(), top()?",
    options: ["20", "30", "10", "40"],
    correctAnswer: 1,
    explanation: "Stack state trace: [10] -> [10, 20] -> pop removes 20 -> [10] -> push 30 -> [10, 30] -> push 40 -> [10, 30, 40] -> pop removes 40 -> [10, 30]. Top element is 30.",
    companyTags: ["Infosys", "TCS"]
  },
  {
    id: "dsa-04",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Sorting & Searching",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the worst-case time complexity of QuickSort when a naive first or last element pivot is used on an already sorted array?",
    options: ["O(n log n)", "O(n)", "O(n\xB2)", "O(log n)"],
    correctAnswer: 2,
    explanation: "When the array is already sorted and the first or last element is chosen as pivot, the partition produces unbalanced subproblems of size (n-1) and 0, resulting in O(n\xB2) worst-case comparisons.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "dsa-05",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Binary Trees",
    difficulty: "intermediate",
    type: "conceptual",
    question: "In a complete binary tree with N nodes, what is the height of the tree in terms of N?",
    options: ["O(N)", "O(log N)", "O(N\xB2)", "O(\u221AN)"],
    correctAnswer: 1,
    explanation: "In a complete binary tree, every level except possibly the last is completely filled. The height is bounded by \u230Alog\u2082 N\u230B, yielding O(log N) height.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "dsa-06",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Binary Search Trees",
    difficulty: "intermediate",
    type: "scenario",
    question: "Which tree traversal on a valid Binary Search Tree (BST) produces node values in strictly ascending sorted order?",
    options: ["Preorder Traversal", "Inorder Traversal", "Postorder Traversal", "Level Order Traversal"],
    correctAnswer: 1,
    explanation: "Inorder traversal visits (Left Subtree -> Current Node -> Right Subtree). Since BST properties guarantee Left < Node < Right, this produces sorted ascending order.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "dsa-07",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Graphs",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which algorithm is best suited for finding the shortest path between a source node and all other nodes in a graph with non-negative edge weights?",
    options: ["Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Kruskal's Algorithm", "Tarjan's Algorithm"],
    correctAnswer: 0,
    explanation: "Dijkstra's algorithm uses a priority queue / min-heap to find single-source shortest paths in O((V + E) log V) time when edge weights are non-negative.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "dsa-08",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Dynamic Programming",
    difficulty: "intermediate",
    type: "scenario",
    question: "What are the two essential characteristics required for a problem to be solvable via Dynamic Programming?",
    options: [
      "Divide and conquer & sorting",
      "Overlapping subproblems & optimal substructure",
      "Greedy choice & linear time complexity",
      "Asymmetric memory & deterministic state"
    ],
    correctAnswer: 1,
    explanation: "Dynamic Programming applies when a problem exhibits Optimal Substructure (an optimal solution can be constructed from optimal sub-solutions) and Overlapping Subproblems (subproblems recur repeatedly).",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "dsa-09",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Arrays",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: 'int arr[] = {1, 2, 3, 4, 5};\nint *ptr = arr;\nprintf("%d", *(ptr + 3));',
    question: "What does this C code output?",
    options: ["3", "4", "5", "Undefined"],
    correctAnswer: 1,
    explanation: "`arr` points to `arr[0]` (1). `ptr + 3` advances the pointer by 3 integer slots to index 3, which contains the value 4. Dereferencing with `*` prints 4.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "dsa-10",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Stacks & Queues",
    difficulty: "intermediate",
    type: "conceptual",
    question: "How can a First-In-First-Out (FIFO) Queue be implemented using two Last-In-First-Out (LIFO) Stacks?",
    options: [
      "Enqueue into Stack1; on Dequeue, if Stack2 is empty, pop all elements from Stack1 into Stack2 and pop Stack2",
      "Push to both stacks simultaneously and pop randomly",
      "A queue cannot be constructed using stacks",
      "Alternate pushing between Stack1 and Stack2 on every operation"
    ],
    correctAnswer: 0,
    explanation: "Pouring elements from Stack1 into Stack2 reverses their order. Popping from Stack2 then yields original FIFO order with amortized O(1) time per operation.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "dsa-11",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Recursion & Backtracking",
    difficulty: "advanced",
    type: "numerical",
    question: "What is the total number of function calls made by a standard recursive Fibonacci function `int fib(int n)` when computing `fib(5)` (where fib(0)=0, fib(1)=1)?",
    options: ["5", "8", "15", "25"],
    correctAnswer: 2,
    explanation: "The call tree branches exponentially: fib(5) calls fib(4)+fib(3); fib(4) calls fib(3)+fib(2)... Total calls count: 1 + 2 + 4 + 6 + 2 = 15 calls without memoization.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "dsa-12",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Dynamic Programming",
    difficulty: "advanced",
    type: "conceptual",
    question: "In the 0/1 Knapsack Problem with N items and maximum weight capacity W, what is the time complexity of the standard 2D DP table approach?",
    options: ["O(N log W)", "O(N * W)", "O(2^N)", "O(N\xB2 + W\xB2)"],
    correctAnswer: 1,
    explanation: "The 2D table has dimensions (N+1) x (W+1). Each cell takes O(1) time to compute, giving O(N * W) pseudo-polynomial time complexity.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "dsa-13",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Graphs",
    difficulty: "advanced",
    type: "scenario",
    question: "Which algorithm detects negative weight cycles in a directed graph?",
    options: ["Bellman-Ford Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Breadth-First Search (BFS)"],
    correctAnswer: 0,
    explanation: "Bellman-Ford relaxes all edges (V - 1) times. A further relaxation in the V-th step that still decreases any distance indicates the existence of a negative weight cycle.",
    companyTags: ["Flipkart", "Amazon"]
  },
  {
    id: "dsa-14",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Sorting & Searching",
    difficulty: "advanced",
    type: "conceptual",
    question: "What is the minimum theoretical comparison lower bound for any comparison-based sorting algorithm on N elements?",
    options: ["\u03A9(N)", "\u03A9(N log N)", "\u03A9(N\xB2)", "\u03A9(log N)"],
    correctAnswer: 1,
    explanation: "A comparison decision tree for N! permutations requires a height of at least log\u2082(N!) = \u03A9(N log N) comparisons in the worst case (Stirling approximation).",
    companyTags: ["Google", "Microsoft"]
  },
  {
    id: "dsa-15",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Arrays",
    difficulty: "beginner",
    type: "scenario",
    question: "Which algorithmic pattern uses two pointers starting from opposite ends of a sorted array to find a pair with a target sum?",
    options: ["Two Pointer Technique", "Sliding Window Technique", "Monotonic Stack", "Prefix Sum Array"],
    correctAnswer: 0,
    explanation: "In a sorted array, if arr[left] + arr[right] > target, decrement right; if < target, increment left. This checks all potential pairs in linear O(N) time.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "dsa-16",
    subject: "Data Structures and Algorithms (DSA)",
    topic: "Linked Lists",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What is Floyd's Cycle-Finding Algorithm (Tortoise and Hare) space complexity for detecting a cycle in a singly linked list?",
    options: ["O(N)", "O(1)", "O(log N)", "O(N\xB2)"],
    correctAnswer: 1,
    explanation: "Floyd's algorithm advances a slow pointer by 1 step and a fast pointer by 2 steps. Since only two pointer variables are maintained, auxiliary space is strictly O(1).",
    companyTags: ["Amazon", "Wipro", "Accenture"]
  },
  // ==========================================
  // 2. DATABASE MANAGEMENT SYSTEMS (16 Questions)
  // ==========================================
  {
    id: "dbms-01",
    subject: "Database Management Systems (DBMS)",
    topic: "ACID Properties",
    difficulty: "beginner",
    type: "conceptual",
    question: 'What does the "A" in ACID properties guarantee during database transactions?',
    options: [
      "All transactions execute asynchronously",
      "The transaction happens completely or not at all (All-or-Nothing)",
      "Data is immediately backed up to secondary storage",
      "Multiple users can access records simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Atomicity ensures that either all operations of a transaction are executed and committed successfully, or if any failure occurs, the database rolls back to its prior state entirely.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "dbms-02",
    subject: "Database Management Systems (DBMS)",
    topic: "Relational Model",
    difficulty: "beginner",
    type: "conceptual",
    question: "In relational database terminology, what is a single row in a table formally called?",
    options: ["Attribute", "Tuple", "Domain", "Relation"],
    correctAnswer: 1,
    explanation: "In the relational model, a table is called a Relation, columns are Attributes, and individual rows are called Tuples.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "dbms-03",
    subject: "Database Management Systems (DBMS)",
    topic: "Normalization",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the primary condition required for a relation to be in First Normal Form (1NF)?",
    options: [
      "No partial functional dependencies on candidate keys",
      "All column values must be atomic (no repeating groups or multi-valued attributes)",
      "No transitive functional dependencies",
      "Every determinant must be a candidate key"
    ],
    correctAnswer: 1,
    explanation: "1NF mandates that attribute domains consist of atomic (indivisible) values and each row/column intersection contains exactly one value, eliminating multi-valued sets.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "dbms-04",
    subject: "Database Management Systems (DBMS)",
    topic: "Normalization",
    difficulty: "intermediate",
    type: "conceptual",
    question: "A relation is in Second Normal Form (2NF) if it is in 1NF and:",
    options: [
      "It contains no transitive dependencies",
      "Every non-prime attribute is fully functionally dependent on the entire candidate key (no partial dependency)",
      "It contains no multi-valued dependencies (4NF)",
      "Foreign keys have cascading deletes enabled"
    ],
    correctAnswer: 1,
    explanation: "2NF eliminates partial functional dependencies: no non-prime attribute should be determined by only a subset/part of a composite candidate key.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "dbms-05",
    subject: "Database Management Systems (DBMS)",
    topic: "Normalization",
    difficulty: "intermediate",
    type: "scenario",
    question: "A table is in 3NF if it is in 2NF and whenever X -> Y holds, which of the following is true?",
    options: [
      "X is a super key or Y is a prime attribute",
      "Y is a candidate key and X is null",
      "Both X and Y are non-prime attributes",
      "X must be equal to Y"
    ],
    correctAnswer: 0,
    explanation: "For Third Normal Form (3NF), in any non-trivial functional dependency X -> Y, either X is a super key or Y is a prime attribute (part of a candidate key), preventing transitive dependencies.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "dbms-06",
    subject: "Database Management Systems (DBMS)",
    topic: "ACID Properties",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which ACID property guarantees that a committed transaction will persist even in the event of an abrupt power outage or server crash?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: 3,
    explanation: "Durability ensures that once a transaction commits, its modifications are permanently recorded in non-volatile storage (via write-ahead logs / disk commits) and survive crashes.",
    companyTags: ["TCS", "Amazon"]
  },
  {
    id: "dbms-07",
    subject: "Database Management Systems (DBMS)",
    topic: "Transactions & Concurrency",
    difficulty: "intermediate",
    type: "scenario",
    question: "What concurrency phenomenon occurs when Transaction 1 reads data, Transaction 2 updates and commits that data, and Transaction 1 re-reads the same row seeing different values?",
    options: ["Dirty Read", "Non-Repeatable Read", "Phantom Read", "Lost Update"],
    correctAnswer: 1,
    explanation: "A Non-Repeatable Read occurs when a transaction reads the same row twice and obtains different data because an intervening transaction modified and committed that row.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "dbms-08",
    subject: "Database Management Systems (DBMS)",
    topic: "Indexing",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Why are B+ Trees preferred over regular Binary Search Trees for disk-based database indexes?",
    options: [
      "B+ Trees have a high branching factor (fan-out), drastically reducing disk I/O seek operations",
      "B+ Trees cannot store duplicates",
      "B+ Trees store all data exclusively in memory without disk writes",
      "B+ Trees execute in O(1) constant time for all queries"
    ],
    correctAnswer: 0,
    explanation: "Disk reads are orders of magnitude slower than CPU operations. The high branching factor of B+ trees keeps tree depth small (typically 3-4 levels for millions of rows), minimizing disk block fetches.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "dbms-09",
    subject: "Database Management Systems (DBMS)",
    topic: "Transactions & Concurrency",
    difficulty: "advanced",
    type: "conceptual",
    question: 'In the Two-Phase Locking (2PL) protocol, what characterizes the "Growing Phase"?',
    options: [
      "Locks may be both acquired and released at will",
      "New locks may be acquired, but no existing locks can be released",
      "Locks are released and no new locks can be acquired",
      "All read locks convert into write locks automatically"
    ],
    correctAnswer: 1,
    explanation: "Under 2PL, a transaction has two phases: Growing (locks are acquired, none released) and Shrinking (locks are released, none acquired). This guarantees conflict serializability.",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "dbms-10",
    subject: "Database Management Systems (DBMS)",
    topic: "Deadlocks in DB",
    difficulty: "advanced",
    type: "scenario",
    question: 'Under the "Wait-Die" deadlock prevention scheme based on timestamps (where older transactions have smaller timestamps), what happens when an older transaction requests a lock held by a younger one?',
    options: [
      "The older transaction is aborted and dies immediately",
      "The older transaction is allowed to wait",
      "The younger transaction is killed and rolled back",
      "Both transactions are terminated"
    ],
    correctAnswer: 1,
    explanation: 'In the non-preemptive Wait-Die scheme: If Old requests lock from Young, Old is allowed to wait ("Wait"). If Young requests lock from Old, Young is killed ("Die").',
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    id: "dbms-11",
    subject: "Database Management Systems (DBMS)",
    topic: "Relational Model",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which constraint ensures that a foreign key value in a child table must match an existing primary key value in the referenced parent table or be NULL?",
    options: ["Entity Integrity", "Referential Integrity", "Domain Integrity", "Check Constraint"],
    correctAnswer: 1,
    explanation: "Referential Integrity mandates that foreign key references must correspond to valid, existing primary key rows in the parent table, preventing orphaned records.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "dbms-12",
    subject: "Database Management Systems (DBMS)",
    topic: "ER Modeling",
    difficulty: "beginner",
    type: "conceptual",
    question: "In an Entity-Relationship (ER) diagram, how is a Weak Entity set conventionally represented?",
    options: ["Single Rectangle", "Double Rectangle", "Dotted Ellipse", "Diamond"],
    correctAnswer: 1,
    explanation: "A Weak Entity (an entity that cannot be uniquely identified by its own attributes alone and depends on an owner entity) is represented with a double-bordered rectangle.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "dbms-13",
    subject: "Database Management Systems (DBMS)",
    topic: "Normalization",
    difficulty: "advanced",
    type: "scenario",
    question: "What strict property distinguishes Boyce-Codd Normal Form (BCNF) from Third Normal Form (3NF)?",
    options: [
      "In BCNF, for every functional dependency X -> Y, X must be a super key (no exception for prime attributes on the right side)",
      "BCNF permits partial dependencies on primary keys",
      "BCNF requires all foreign keys to be composite",
      "BCNF is weaker than 3NF"
    ],
    correctAnswer: 0,
    explanation: "3NF allows X -> Y if Y is a prime attribute even if X is not a super key. BCNF removes this exception: X must strictly be a super key for every functional dependency.",
    companyTags: ["TCS Digital", "Infosys"]
  },
  {
    id: "dbms-14",
    subject: "Database Management Systems (DBMS)",
    topic: "Indexing",
    difficulty: "intermediate",
    type: "conceptual",
    question: "How many Clustered Indexes can exist on a single table in a standard relational database?",
    options: ["Zero or One", "Up to 16", "Unlimited", "One per column"],
    correctAnswer: 0,
    explanation: "A Clustered Index dictates the physical ordering of records on the storage disk. Because physical data rows can only be ordered in one way, only one clustered index can exist per table.",
    companyTags: ["Amazon", "Accenture"]
  },
  {
    id: "dbms-15",
    subject: "Database Management Systems (DBMS)",
    topic: "Transactions & Concurrency",
    difficulty: "advanced",
    type: "scenario",
    question: "Which SQL Transaction Isolation Level completely prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?",
    options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
    correctAnswer: 3,
    explanation: "SERIALIZABLE is the highest isolation level. It enforces total serial execution order (often using range/predicate locks) preventing phantom rows, dirty reads, and non-repeatable reads.",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "dbms-16",
    subject: "Database Management Systems (DBMS)",
    topic: "ACID Properties",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which component of a DBMS is responsible for tracking all active transactions and executing UNDO/REDO operations after unexpected failures?",
    options: ["Query Optimizer", "Recovery Manager (Log Manager)", "Buffer Manager", "DDL Compiler"],
    correctAnswer: 1,
    explanation: "The Recovery Manager uses Write-Ahead Logging (WAL) to record transactions before committing, and during recovery performs REDO on committed transactions and UNDO on uncommitted ones.",
    companyTags: ["TCS", "Infosys"]
  },
  // ==========================================
  // 3. OPERATING SYSTEMS (16 Questions)
  // ==========================================
  {
    id: "os-01",
    subject: "Operating Systems (OS)",
    topic: "Process Management",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the primary difference between a Process and a Thread?",
    options: [
      "A thread has its own isolated memory address space; processes share memory",
      "A process is an executing program with its own memory space; threads are lightweight execution units within a process sharing memory",
      "Threads cannot run concurrently on multi-core processors",
      "Processes require no system calls to create"
    ],
    correctAnswer: 1,
    explanation: "A Process owns its dedicated virtual address space, file descriptors, and environment. Threads share the parent process code, data, and heap while maintaining private stacks and program counters.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "os-02",
    subject: "Operating Systems (OS)",
    topic: "CPU Scheduling",
    difficulty: "beginner",
    type: "conceptual",
    question: 'Which CPU scheduling algorithm can lead to the "Convoy Effect", where short processes wait behind one CPU-intensive process?',
    options: ["Round Robin (RR)", "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling"],
    correctAnswer: 1,
    explanation: "In non-preemptive FCFS, if a long CPU-bound process enters the queue first, all subsequent short I/O-bound processes are blocked waiting behind it, severely reducing device utilization.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "os-03",
    subject: "Operating Systems (OS)",
    topic: "Process Synchronization",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What are the three mandatory requirements that any valid solution to the Critical Section problem must satisfy?",
    options: [
      "Mutual Exclusion, Progress, and Bounded Waiting",
      "Atomicity, Consistency, and Durability",
      "Preemption, Non-preemption, and Circular Wait",
      "Deadlock, Starvation, and Livelock"
    ],
    correctAnswer: 0,
    explanation: "To solve critical section races: 1. Mutual Exclusion (only 1 process inside at a time), 2. Progress (selection cannot be postponed indefinitely), 3. Bounded Waiting (a bound exists on entry turns).",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "os-04",
    subject: "Operating Systems (OS)",
    topic: "Deadlocks",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which of the following is NOT one of Coffman\u2019s four necessary conditions for a Deadlock to occur?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed by default", "Circular Wait"],
    correctAnswer: 2,
    explanation: "Deadlock requires *No Preemption* (resources cannot be forcibly confiscated from a process). If preemption is allowed by default, deadlock is broken.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "os-05",
    subject: "Operating Systems (OS)",
    topic: "Deadlocks",
    difficulty: "advanced",
    type: "scenario",
    question: "What is the primary purpose of Dijkstra's Banker's Algorithm in an Operating System?",
    options: [
      "To detect and terminate infected processes",
      "To avoid deadlocks by testing for safe states before granting resource requests",
      "To schedule I/O requests to the hard disk",
      "To compress physical RAM into virtual swap space"
    ],
    correctAnswer: 1,
    explanation: "The Banker's Algorithm evaluates whether allocating requested resources leaves the system in a 'Safe State' where every process can eventually finish. If unsafe, the request is delayed.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "os-06",
    subject: "Operating Systems (OS)",
    topic: "Memory Management & Paging",
    difficulty: "intermediate",
    type: "numerical",
    question: "In a paging system with a 32-bit virtual address and a page size of 4 KB (2^12 bytes), how many bits represent the page number (p) and page offset (d)?",
    options: [
      "p = 20 bits, d = 12 bits",
      "p = 16 bits, d = 16 bits",
      "p = 12 bits, d = 20 bits",
      "p = 24 bits, d = 8 bits"
    ],
    correctAnswer: 0,
    explanation: "Page size = 4 KB = 2^12 bytes, requiring 12 offset bits (d). Remaining virtual address bits = 32 - 12 = 20 bits for the page number (p), referencing up to 2^20 pages.",
    companyTags: ["TCS Digital", "Amazon"]
  },
  {
    id: "os-07",
    subject: "Operating Systems (OS)",
    topic: "Virtual Memory",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What is "Thrashing" in an operating system?',
    options: [
      "A hardware fault where CPU clock cycles halt",
      "A situation where the CPU spends more time swapping pages in and out than executing instructions",
      "A network buffer overflow caused by high packet arrival rate",
      "Multiple processes deadlocking on a printer resource"
    ],
    correctAnswer: 1,
    explanation: "Thrashing occurs when the active working sets of all processes exceed available physical memory. Page faults occur continually, causing high page replacement I/O and near-zero CPU utilization.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "os-08",
    subject: "Operating Systems (OS)",
    topic: "Process Management",
    difficulty: "intermediate",
    type: "scenario",
    question: 'In Unix/Linux, what is a "Zombie Process"?',
    options: [
      "A process that has finished execution via `exit()` but still has an entry in the process table because its parent has not called `wait()`",
      "A process whose parent has terminated while it continues running",
      "A process that consumes 100% CPU in an infinite loop",
      "A daemon process that launches on boot"
    ],
    correctAnswer: 0,
    explanation: "A zombie process has exited, freeing its memory, but retains its PID and exit status code in the process table until the parent acknowledges it using wait() or waitpid().",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "os-09",
    subject: "Operating Systems (OS)",
    topic: "Memory Management & Paging",
    difficulty: "advanced",
    type: "conceptual",
    question: "What anomaly states that for certain page replacement algorithms (such as FIFO), increasing the number of physical page frames can paradoxically increase the number of page faults?",
    options: ["Amdahl's Law", "Belady's Anomaly", "Moore's Anomaly", "Little's Law"],
    correctAnswer: 1,
    explanation: "Belady's Anomaly demonstrates that FIFO page replacement can experience more page faults when allocated more frames. Stack-based algorithms like LRU and Optimal are immune to this.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    id: "os-10",
    subject: "Operating Systems (OS)",
    topic: "Process Synchronization",
    difficulty: "intermediate",
    type: "code_output",
    question: "A counting semaphore S is initialized to 7. Then 20 wait(P) operations and 15 signal(V) operations are executed. What is the final value of S?",
    options: ["2", "0", "-2", "12"],
    correctAnswer: 0,
    explanation: "Initial S = 7. Each wait(P) decrements by 1: 7 - 20 = -13. Each signal(V) increments by 1: -13 + 15 = 2. Final value is 2.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "os-11",
    subject: "Operating Systems (OS)",
    topic: "CPU Scheduling",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which scheduling metric represents the time elapsed from the submission of a process until its complete termination?",
    options: ["Turnaround Time", "Waiting Time", "Response Time", "Throughput"],
    correctAnswer: 0,
    explanation: "Turnaround Time = Completion Time - Arrival Time. It represents the total lifespan of the process in the system, encompassing execution, I/O waits, and queue delays.",
    companyTags: ["Accenture", "Wipro"]
  },
  {
    id: "os-12",
    subject: "Operating Systems (OS)",
    topic: "Process Management",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the purpose of the Translation Lookaside Buffer (TLB)?",
    options: [
      "A fast hardware cache of recent virtual-to-physical address page translations to speed up memory access",
      "A software stack storing interrupted thread registers",
      "A buffer for network packets awaiting transmission",
      "A disk block cache storing file inodes"
    ],
    correctAnswer: 0,
    explanation: "TLB is a small, associative hardware cache inside the MMU that stores recent page-to-frame translations, reducing memory lookup latency from 2+ memory references to a single cache hit.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "os-13",
    subject: "Operating Systems (OS)",
    topic: "Disk Scheduling",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which disk scheduling algorithm services requests by sweeping back and forth across cylinders like an elevator?",
    options: ["SCAN (Elevator Algorithm)", "FCFS", "SSTF (Shortest Seek Time First)", "C-LOOK"],
    correctAnswer: 0,
    explanation: "The SCAN algorithm moves the disk arm in one direction servicing all pending requests until it reaches the end cylinder, then reverses direction, operating exactly like an elevator.",
    companyTags: ["TCS", "Cognizant"]
  },
  {
    id: "os-14",
    subject: "Operating Systems (OS)",
    topic: "Process Management",
    difficulty: "advanced",
    type: "scenario",
    question: "What happens during a CPU Context Switch?",
    options: [
      "The OS saves the state (registers, PC, stack pointer) of the current process and loads the saved state of the next scheduled process",
      "The CPU compiles bytecode into native machine instructions",
      "The RAM memory is completely flushed to SSD swap space",
      "The network interface negotiates a new TCP window"
    ],
    correctAnswer: 0,
    explanation: "A context switch saves the context of the running process in its Process Control Block (PCB) and restores the context of the newly scheduled process, introducing pure CPU overhead.",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "os-15",
    subject: "Operating Systems (OS)",
    topic: "Process Synchronization",
    difficulty: "advanced",
    type: "scenario",
    question: 'What is "Priority Inversion" and how is it commonly resolved in real-time operating systems?',
    options: [
      "A high-priority process is blocked waiting for a resource held by a low-priority process; solved using Priority Inheritance",
      "Low-priority processes receive infinite CPU time; solved by rebooting",
      "Threads switch priority randomly; solved by FIFO scheduling",
      "Interrupt handlers run at user privilege level; solved by microkernels"
    ],
    correctAnswer: 0,
    explanation: "Priority Inversion occurs when a medium task preempts a low task holding a lock needed by a high task. Priority Inheritance temporarily boosts the low task\u2019s priority to the high task\u2019s level.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    id: "os-16",
    subject: "Operating Systems (OS)",
    topic: "Virtual Memory",
    difficulty: "beginner",
    type: "conceptual",
    question: "When a process attempts to access a virtual memory page that is not currently mapped into physical RAM, what hardware interrupt is triggered?",
    options: ["Page Fault", "Segmentation Fault", "Bus Error", "Buffer Overflow"],
    correctAnswer: 0,
    explanation: "The Memory Management Unit (MMU) raises a Page Fault interrupt. The OS trap handler intercepts it, locates the required page in secondary storage, loads it into a free frame, and resumes execution.",
    companyTags: ["TCS", "Infosys"]
  },
  // ==========================================
  // 4. COMPUTER NETWORKS (16 Questions)
  // ==========================================
  {
    id: "cn-01",
    subject: "Computer Networks (CN)",
    topic: "OSI Model",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which layer of the 7-layer OSI model is responsible for end-to-end reliability, flow control, and segmentation?",
    options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
    correctAnswer: 1,
    explanation: "The Transport Layer (Layer 4) handles end-to-end communication, packet segmentation/reassembly, error detection, flow control, and connection management (e.g., TCP).",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "cn-02",
    subject: "Computer Networks (CN)",
    topic: "Transport Protocols (TCP/UDP)",
    difficulty: "beginner",
    type: "conceptual",
    question: "What packets are exchanged during the standard TCP Three-Way Handshake connection establishment?",
    options: [
      "SYN -> SYN-ACK -> ACK",
      "PING -> PONG -> ACK",
      "ACK -> SYN -> DATA",
      "CONNECT -> ACCEPT -> READY"
    ],
    correctAnswer: 0,
    explanation: "1. Client sends SYN (Synchronize sequence number), 2. Server responds with SYN-ACK (Synchronize and Acknowledge), 3. Client replies with ACK (Acknowledge). The connection is then ESTABLISHED.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "cn-03",
    subject: "Computer Networks (CN)",
    topic: "IP Addressing & Subnetting",
    difficulty: "intermediate",
    type: "numerical",
    question: "In an IPv4 network with subnet mask 255.255.255.192 (/26), how many usable host IP addresses are available in each subnet?",
    options: ["64", "62", "32", "30"],
    correctAnswer: 1,
    explanation: "/26 leaves 32 - 26 = 6 host bits. Total IP addresses = 2^6 = 64. Subtracting 2 for Network Address (all 0s) and Broadcast Address (all 1s) yields 64 - 2 = 62 usable host addresses.",
    companyTags: ["TCS Digital", "Infosys"]
  },
  {
    id: "cn-04",
    subject: "Computer Networks (CN)",
    topic: "Application Protocols (HTTP, DNS)",
    difficulty: "beginner",
    type: "conceptual",
    question: "What default port numbers are used for HTTP and HTTPS traffic respectively?",
    options: ["Port 80 and Port 443", "Port 21 and Port 22", "Port 25 and Port 110", "Port 53 and Port 8080"],
    correctAnswer: 0,
    explanation: "Standard unencrypted HTTP traffic uses TCP port 80. Encrypted HTTPS traffic (HTTP over TLS/SSL) uses TCP port 443.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "cn-05",
    subject: "Computer Networks (CN)",
    topic: "Application Protocols (HTTP, DNS)",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the primary role of the Domain Name System (DNS)?",
    options: [
      "Encrypting web traffic between client and server",
      "Translating human-friendly domain names (e.g. google.com) into numerical IP addresses",
      "Assigning dynamic IP addresses to newly connected home devices",
      "Filtering malware packets at the router firewall"
    ],
    correctAnswer: 1,
    explanation: "DNS functions like the telephone directory of the Internet, mapping alphabetical hostnames (like www.example.com) to machine-routable IP addresses (like 93.184.216.34).",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "cn-06",
    subject: "Computer Networks (CN)",
    topic: "Transport Protocols (TCP/UDP)",
    difficulty: "beginner",
    type: "conceptual",
    question: "Why is User Datagram Protocol (UDP) preferred over TCP for live video streaming and online gaming?",
    options: [
      "UDP encrypts packets with higher bit depth",
      "UDP has no connection overhead, zero handshake delay, and does not retransmit dropped packets",
      "UDP guarantees 100% in-order packet arrival",
      "UDP works without IP addresses"
    ],
    correctAnswer: 1,
    explanation: "UDP is connectionless and lightweight. For real-time applications (voice calls, FPS gaming, video), timeliness matters more than 100% reliability; retransmitting a lost frame 300ms late is useless.",
    companyTags: ["Amazon", "Cognizant"]
  },
  {
    id: "cn-07",
    subject: "Computer Networks (CN)",
    topic: "Transport Protocols (TCP/UDP)",
    difficulty: "intermediate",
    type: "scenario",
    question: "What mechanism does TCP use to prevent a fast sender from overwhelming a slow receiver with more data than its buffers can hold?",
    options: ["Flow Control (Sliding Window)", "Congestion Control", "Address Resolution", "Subnet Masking"],
    correctAnswer: 0,
    explanation: "TCP Flow Control uses the Receiver Window (rwnd) field in the TCP header to advertise how much buffer space remains. The sender never transmits more bytes than rwnd allows.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "cn-08",
    subject: "Computer Networks (CN)",
    topic: "Routing Algorithms",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What issue in Distance Vector Routing (like RIP) causes routers to slowly increment hop counts towards infinity when a network link fails?",
    options: ["Count-to-Infinity Problem", "Silently Dropped Frame", "Head-of-Line Blocking", "Jitter Accumulation"],
    correctAnswer: 0,
    explanation: "The Count-to-Infinity problem occurs due to routing loops where two routers keep updating each other with misleading distances. Techniques like Split Horizon and Poison Reverse help mitigate it.",
    companyTags: ["TCS Digital", "Infosys"]
  },
  {
    id: "cn-09",
    subject: "Computer Networks (CN)",
    topic: "Application Protocols (HTTP, DNS)",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which HTTP response status code series indicates a Client Error (such as Unauthorized or Not Found)?",
    options: ["2xx series", "3xx series", "4xx series", "5xx series"],
    correctAnswer: 2,
    explanation: "2xx indicates Success (200 OK), 3xx Redirection (301 Moved), 4xx Client Errors (400 Bad Request, 401 Unauthorized, 404 Not Found), and 5xx Server Errors (500 Internal Error, 502 Bad Gateway).",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "cn-10",
    subject: "Computer Networks (CN)",
    topic: "OSI Model",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What is the Data Link Layer (Layer 2) protocol data unit (PDU) called?",
    options: ["Packet", "Segment", "Frame", "Bit Stream"],
    correctAnswer: 2,
    explanation: "Layer 1 (Physical) = Bits, Layer 2 (Data Link) = Frames, Layer 3 (Network) = Packets, Layer 4 (Transport) = Segments (TCP) or Datagrams (UDP).",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "cn-11",
    subject: "Computer Networks (CN)",
    topic: "IP Addressing & Subnetting",
    difficulty: "advanced",
    type: "scenario",
    question: "What protocol resolves an IP address into its corresponding physical hardware MAC address on a local Ethernet network?",
    options: ["Address Resolution Protocol (ARP)", "DHCP", "ICMP", "BGP"],
    correctAnswer: 0,
    explanation: 'ARP broadcasts "Who has IP X.X.X.X? Tell me your MAC address" on the local network segment. The matching host responds with its 48-bit physical MAC address.',
    companyTags: ["Amazon", "Cisco"]
  },
  {
    id: "cn-12",
    subject: "Computer Networks (CN)",
    topic: "Transport Protocols (TCP/UDP)",
    difficulty: "advanced",
    type: "conceptual",
    question: "In TCP Congestion Control, what phase immediately follows the Slow Start threshold (ssthresh) being reached?",
    options: ["Congestion Avoidance", "Fast Retransmit", "Exponential Falloff", "Connection Teardown"],
    correctAnswer: 0,
    explanation: "During Slow Start, the congestion window (cwnd) doubles every RTT. When cwnd >= ssthresh, TCP transitions into Congestion Avoidance, growing cwnd linearly (additive increase by 1 MSS per RTT).",
    companyTags: ["Google", "Amazon"]
  },
  {
    id: "cn-13",
    subject: "Computer Networks (CN)",
    topic: "Application Protocols (HTTP, DNS)",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What protocol is used by the `ping` utility to test network connectivity and measure round-trip time?",
    options: ["Internet Control Message Protocol (ICMP)", "SNMP", "IGMP", "ARP"],
    correctAnswer: 0,
    explanation: "`ping` sends ICMP Echo Request messages (Type 8) and listens for corresponding ICMP Echo Reply messages (Type 0) to report round-trip latency and packet loss.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "cn-14",
    subject: "Computer Networks (CN)",
    topic: "IP Addressing & Subnetting",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which of the following IPv4 address ranges is designated as Private (RFC 1918) and non-routable on the public internet?",
    options: [
      "192.168.0.0 to 192.168.255.255",
      "8.8.8.0 to 8.8.8.255",
      "128.0.0.0 to 128.255.255.255",
      "240.0.0.0 to 255.255.255.255"
    ],
    correctAnswer: 0,
    explanation: "RFC 1918 reserves three private IPv4 blocks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Routers drop private IPs on public Internet backbones unless translated via NAT.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "cn-15",
    subject: "Computer Networks (CN)",
    topic: "Application Protocols (HTTP, DNS)",
    difficulty: "advanced",
    type: "scenario",
    question: "What key innovation introduced in HTTP/2 eliminated head-of-line blocking at the application layer compared to HTTP/1.1?",
    options: [
      "Multiplexing over a single TCP connection using binary framing",
      "Switching from TCP to UDP",
      "Disabling SSL encryption",
      "Removing request headers"
    ],
    correctAnswer: 0,
    explanation: "HTTP/2 breaks requests and responses into independent binary frames and multiplexes them concurrently over a single TCP connection, allowing multiple resources to stream without blocking each other.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    id: "cn-16",
    subject: "Computer Networks (CN)",
    topic: "TCP/IP Architecture",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the size of an IPv4 address and an IPv6 address in bits?",
    options: ["32 bits and 128 bits", "64 bits and 256 bits", "16 bits and 64 bits", "32 bits and 64 bits"],
    correctAnswer: 0,
    explanation: "IPv4 addresses are 32 bits long (4 octets, providing ~4.3 billion addresses). IPv6 addresses are 128 bits long (written in hexadecimal groups, providing 3.4 x 10^38 addresses).",
    companyTags: ["TCS", "Infosys"]
  },
  // ==========================================
  // 5. OBJECT-ORIENTED PROGRAMMING (16 Questions)
  // ==========================================
  {
    id: "oops-01",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Encapsulation & Abstraction",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is Encapsulation in Object-Oriented Programming?",
    options: [
      "Binding data variables and the methods that operate on them together within a single class while restricting direct external access",
      "The ability of an object to take multiple forms at runtime",
      "Deriving new classes from existing classes",
      "Deleting unused objects automatically from the heap"
    ],
    correctAnswer: 0,
    explanation: "Encapsulation bundles data and methods into a class and restricts direct access to internal state using private/protected access modifiers, accessed via public getters and setters.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "oops-02",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Polymorphism",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which of the following is an example of Compile-Time (Static) Polymorphism?",
    options: ["Method Overloading", "Method Overriding", "Virtual Function resolution", "Interface Implementation"],
    correctAnswer: 0,
    explanation: "Method Overloading (methods with the same name but different parameter signatures in the same class) is resolved at compile-time by the compiler, hence static polymorphism.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "oops-03",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Inheritance & Virtual Functions",
    difficulty: "intermediate",
    type: "scenario",
    question: "What programming challenge occurs in C++ when a derived class inherits from two parent classes that both inherit from the same common base class?",
    options: ["The Diamond Problem", "The Memory Leak Hazard", "The Dangling Pointer Dilemma", "The Strict Alias Rule"],
    correctAnswer: 0,
    explanation: "The Diamond Problem occurs in multiple inheritance when a class D inherits from B and C, both inheriting from A, creating duplicate copies of A\u2019s members. It is resolved using `virtual inheritance`.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "oops-04",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Interfaces & Abstract Classes",
    difficulty: "beginner",
    type: "conceptual",
    question: "Can you instantiate an object directly from an Abstract Class in Java or C++?",
    options: [
      "No, abstract classes cannot be instantiated directly and must be subclassed",
      "Yes, by passing null to the constructor",
      "Yes, but only inside static methods",
      "Yes, if it has no abstract methods"
    ],
    correctAnswer: 0,
    explanation: "Abstract classes serve as base templates and cannot be instantiated with `new`. Concrete derived classes must provide implementations for all abstract/pure virtual methods before being instantiated.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "oops-05",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "SOLID Principles",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What does the Single Responsibility Principle (SRP) in SOLID software design state?",
    options: [
      "A class should have one, and only one, reason to change",
      "Software entities should be open for modification and closed for extension",
      "Derived classes must be substitutable for their base classes",
      "Classes should only use single inheritance"
    ],
    correctAnswer: 0,
    explanation: "SRP states that a class should encapsulate a single responsibility or business actor concern. If a class handles database persistence, business calculation, and PDF formatting, it violates SRP.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "oops-06",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Polymorphism",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: 'class Base {\n  public void show() { System.out.print("Base "); }\n}\nclass Derived extends Base {\n  public void show() { System.out.print("Derived "); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Base obj = new Derived();\n    obj.show();\n  }\n}',
    question: "What does this Java program print when executed?",
    options: ["Derived ", "Base ", "Compilation Error", "Base Derived "],
    correctAnswer: 0,
    explanation: "Java uses dynamic method dispatch for non-static methods by default. At runtime, the JVM looks at the actual object instance type (`Derived`), not the reference type (`Base`), executing `Derived.show()`.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "oops-07",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Design Patterns",
    difficulty: "intermediate",
    type: "scenario",
    question: "Which Creational Design Pattern ensures that a class has only one instance and provides a global access point to it throughout the application lifetime?",
    options: ["Singleton Pattern", "Factory Method Pattern", "Observer Pattern", "Adapter Pattern"],
    correctAnswer: 0,
    explanation: "The Singleton Pattern restricts class instantiation to a single object (via private constructor and static getInstance() method), commonly used for database connection pools and logging services.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "oops-08",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "SOLID Principles",
    difficulty: "advanced",
    type: "scenario",
    question: "Which SOLID principle is violated if a `Square` subclass inherits from a `Rectangle` base class and overrides `setWidth` to modify both width and height, breaking code expecting a Rectangle?",
    options: [
      "Liskov Substitution Principle (LSP)",
      "Single Responsibility Principle (SRP)",
      "Interface Segregation Principle (ISP)",
      "Dependency Inversion Principle (DIP)"
    ],
    correctAnswer: 0,
    explanation: "LSP requires that objects of a superclass be replaceable with objects of a subclass without altering the correctness of the program. Changing side-effect semantics of Rectangle violates LSP.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "oops-09",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Inheritance & Virtual Functions",
    difficulty: "advanced",
    type: "conceptual",
    question: "How does C++ implement dynamic runtime polymorphism under the hood for classes containing virtual functions?",
    options: [
      "Using a virtual method table (vtable) and a hidden vptr pointer inside each object instance",
      "By re-compiling the function at runtime with JIT",
      "By executing string comparisons on function signatures",
      "By duplicating code for every inheritance level"
    ],
    correctAnswer: 0,
    explanation: "The C++ compiler builds a static vtable of function pointers per class and inserts an invisible `vptr` in each object instance pointing to its class vtable. At runtime, `vptr->function()` is called.",
    companyTags: ["Microsoft", "Google"]
  },
  {
    id: "oops-09b",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Encapsulation & Abstraction",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which access modifier allows members of a class to be accessed only within the same class and its subclasses (derived classes)?",
    options: ["private", "protected", "public", "package-private"],
    correctAnswer: 1,
    explanation: "`protected` members are accessible within their own class and by derived subclasses through inheritance (as well as within the same package in Java).",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "oops-11",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Design Patterns",
    difficulty: "advanced",
    type: "conceptual",
    question: "Which Behavioral Design Pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically?",
    options: ["Observer Pattern", "Strategy Pattern", "Decorator Pattern", "Facade Pattern"],
    correctAnswer: 0,
    explanation: "The Observer Pattern (used heavily in event listeners, Redux, reactive streams, and MVC models) maintains a list of subscribers and broadcasts state change notifications automatically.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "oops-12",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Interfaces & Abstract Classes",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Can an interface in Java 8 and later contain implemented methods with code bodies?",
    options: [
      "Yes, by declaring them with the `default` or `static` keyword",
      "No, interfaces can only contain abstract method signatures",
      "Yes, but only if they are private constructors",
      "No, implemented methods are only permitted in C++"
    ],
    correctAnswer: 0,
    explanation: "Java 8 introduced `default` and `static` methods in interfaces to allow backwards-compatible evolution of APIs (such as adding forEach to Collection) without breaking existing implementations.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "oops-13",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Inheritance & Virtual Functions",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Why should base class destructors in C++ almost always be declared `virtual` if derived classes will be deleted via base pointers?",
    options: [
      "To ensure the derived class destructor is called and prevents resource/memory leaks upon deletion",
      "To prevent the base class from being deleted",
      "To speed up compiler optimization",
      "C++ requires all destructors to be virtual"
    ],
    correctAnswer: 0,
    explanation: "If `delete basePtr` is called without a virtual destructor in Base, only `Base::~Base()` executes, skipping `Derived::~Derived()` and leaking derived memory or handles (undefined behavior).",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    id: "oops-14",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "SOLID Principles",
    difficulty: "advanced",
    type: "conceptual",
    question: "What does the Dependency Inversion Principle (DIP) mandate?",
    options: [
      "High-level modules should not depend on low-level modules; both should depend on abstractions",
      "Objects should never create internal variables",
      "Child classes must invert parent access modifiers",
      "Database code must always run before UI code"
    ],
    correctAnswer: 0,
    explanation: "DIP states: High-level business logic should depend on interfaces/abstractions rather than concrete low-level implementations. This decouples modules and enables easy mocking/swapping.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "oops-15",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Encapsulation & Abstraction",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is a Copy Constructor?",
    options: [
      "A constructor that initializes a new object using an existing object of the same class",
      "A method that duplicates an entire database row",
      "A constructor copied from another project",
      "A function that copies file descriptors"
    ],
    correctAnswer: 0,
    explanation: "A copy constructor (e.g. `MyClass(const MyClass &other)`) creates a new object as a copy of an existing object, enabling custom deep copying of dynamically allocated pointer members.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "oops-16",
    subject: "Object-Oriented Programming (OOPs)",
    topic: "Polymorphism",
    difficulty: "beginner",
    type: "conceptual",
    question: "Can you overload a method in Java or C++ based purely on a different return type alone (with identical parameter types)?",
    options: [
      "No, return type alone is insufficient for the compiler to distinguish overloaded calls",
      "Yes, the compiler chooses based on assignment",
      "Yes, in Java but not in C++",
      "Yes, but only for primitive return types"
    ],
    correctAnswer: 0,
    explanation: "Method overloading requires differing parameter lists (count, order, or types). When a function is called without assigning its return value (e.g. `doWork()`), the compiler cannot determine which to call.",
    companyTags: ["Wipro", "Accenture", "Cognizant"]
  },
  // ==========================================
  // 6. PROGRAMMING FUNDAMENTALS (16 Questions)
  // ==========================================
  {
    id: "pf-01",
    subject: "Programming Fundamentals",
    topic: "C Language Pointers & Memory",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n  int a = 5;\n  int *p = &a;\n  *p = *p * 2;\n  printf("%d", a);\n  return 0;\n}',
    question: "What does this C program print?",
    options: ["5", "10", "Address of a", "Compilation Error"],
    correctAnswer: 1,
    explanation: '`p` holds the memory address of `a`. `*p = *p * 2` dereferences `p`, reading 5, multiplying by 2, and storing 10 back into `a`. Thus `printf("%d", a)` prints 10.',
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "pf-02",
    subject: "Programming Fundamentals",
    topic: "Python Data Structures & Scope",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "nums = [1, 2, 3]\nnums_ref = nums\nnums_ref.append(4)\nprint(len(nums))",
    question: "What is the output of this Python code snippet?",
    options: ["3", "4", "TypeError", "None"],
    correctAnswer: 1,
    explanation: "In Python, list assignment binds a reference to the same mutable object in memory, not a copy. Modifying `nums_ref` directly mutates `nums`. Length is 4.",
    companyTags: ["Cognizant", "Accenture"]
  },
  {
    id: "pf-03",
    subject: "Programming Fundamentals",
    topic: "Java Memory & Garbage Collection",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Where are Java object instances created via `new` allocated in JVM memory, and where are local primitive variables stored?",
    options: [
      "Objects on the Heap; local primitive variables on the Thread Stack",
      "Objects on the Stack; primitives on the Heap",
      "Both are stored strictly in CPU registers",
      "Both are stored on the Metaspace disk cache"
    ],
    correctAnswer: 0,
    explanation: "In the JVM, all object instances and array allocations reside in the shared Heap (managed by Garbage Collection). Thread execution frames, method calls, and local primitive variables live on the Stack.",
    companyTags: ["Infosys", "TCS Digital"]
  },
  {
    id: "pf-04",
    subject: "Programming Fundamentals",
    topic: "C++ References & STL",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "#include <iostream>\nusing namespace std;\nvoid modify(int &x) {\n  x += 10;\n}\nint main() {\n  int val = 20;\n  modify(val);\n  cout << val;\n  return 0;\n}",
    question: "What does this C++ program output?",
    options: ["20", "30", "10", "Compiler Error"],
    correctAnswer: 1,
    explanation: "The function parameter `int &x` is a pass-by-reference. Modifications to `x` directly mutate the original caller variable `val` in place, turning 20 into 30.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "pf-05",
    subject: "Programming Fundamentals",
    topic: "Type Systems & Operators",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n  int x = 5;\n  int y = x++ + ++x;\n  printf("%d", y);\n  return 0;\n}',
    question: "In standard C99/C11 sequence point rules, modifying the same variable `x` multiple times without a sequence point causes:",
    options: [
      "Undefined Behavior (compiler-dependent result)",
      "Guaranteed output of 12",
      "Guaranteed output of 10",
      "Syntax error"
    ],
    correctAnswer: 0,
    explanation: "Modifying a scalar variable more than once between two consecutive sequence points produces Undefined Behavior (UB) according to the ISO C standard, and should never be used in production.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "pf-06",
    subject: "Programming Fundamentals",
    topic: "Python Data Structures & Scope",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "def func(val, lst=[]):\n    lst.append(val)\n    return lst\n\nprint(func(1))\nprint(func(2))",
    question: "What does this Python code print?",
    options: ["[1] and [1, 2]", "[1] and [2]", "[1, 2] and [1, 2]", "SyntaxError"],
    correctAnswer: 0,
    explanation: "Default parameter expressions in Python are evaluated once when the function is defined, not on each call. The same mutable default list is reused across invocations, so `func(2)` appends to `[1]`.",
    companyTags: ["Amazon", "Cognizant"]
  },
  {
    id: "pf-07",
    subject: "Programming Fundamentals",
    topic: "C Language Pointers & Memory",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What is a "Dangling Pointer" in C/C++?',
    options: [
      "A pointer pointing to a memory location that has already been deallocated/freed",
      "A pointer initialized to NULL",
      "A pointer pointing to a read-only string literal",
      "A pointer with void data type"
    ],
    correctAnswer: 0,
    explanation: "A dangling pointer arises when memory is deallocated (via free() or exiting stack scope) without resetting the pointer to NULL. Dereferencing it results in undefined behavior or memory corruption.",
    companyTags: ["Infosys", "TCS"]
  },
  {
    id: "pf-08",
    subject: "Programming Fundamentals",
    topic: "Java Memory & Garbage Collection",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: 'String s1 = "Hello";\nString s2 = "Hello";\nString s3 = new String("Hello");\nSystem.out.print((s1 == s2) + " " + (s1 == s3));',
    question: "What does this Java code print?",
    options: ["true false", "true true", "false false", "false true"],
    correctAnswer: 0,
    explanation: "`s1` and `s2` reference the same literal in the String Constant Pool (`s1 == s2` is true). `s3` is explicitly instantiated on the general heap via `new`, creating a distinct object reference (`s1 == s3` is false).",
    companyTags: ["Accenture", "TCS"]
  },
  {
    id: "pf-09",
    subject: "Programming Fundamentals",
    topic: "C Language Pointers & Memory",
    difficulty: "advanced",
    type: "conceptual",
    question: "What is the difference between `malloc()` and `calloc()` in C standard library?",
    options: [
      "`malloc()` leaves allocated memory uninitialized (garbage values); `calloc()` clears and initializes all allocated memory bytes to zero",
      "`malloc()` allocates on the stack; `calloc()` allocates on the heap",
      "`calloc()` cannot be freed with `free()`",
      "`malloc()` is for characters and `calloc()` is for integers"
    ],
    correctAnswer: 0,
    explanation: "`malloc(size)` allocates raw uninitialized heap bytes. `calloc(num, size)` allocates contiguous memory and zeroes out every byte, taking two parameters (number of elements and size per element).",
    companyTags: ["Wipro", "TCS Digital"]
  },
  {
    id: "pf-10",
    subject: "Programming Fundamentals",
    topic: "Type Systems & Operators",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the purpose of the `static` keyword when applied to a local variable inside a C/C++ function?",
    options: [
      "The variable retains its value between multiple function invocations throughout program lifetime",
      "The variable can only be accessed by one thread",
      "The variable becomes unchangeable (constant)",
      "The variable is stored on the stack"
    ],
    correctAnswer: 0,
    explanation: "A static local variable is initialized only once in the data segment. It persists across subsequent calls to that function rather than being allocated and destroyed on the stack frame.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "pf-11",
    subject: "Programming Fundamentals",
    topic: "Python Data Structures & Scope",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which of the following data types in Python is IMMUTABLE?",
    options: ["Tuple", "List", "Dictionary", "Set"],
    correctAnswer: 0,
    explanation: "In Python, numbers, strings, and tuples are immutable (their contents cannot be modified in place after creation). Lists, dictionaries, and sets are mutable.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "pf-12",
    subject: "Programming Fundamentals",
    topic: "C++ References & STL",
    difficulty: "advanced",
    type: "conceptual",
    question: "What is the internal data structure used by `std::map` in C++ standard template library?",
    options: ["Red-Black Tree (Self-Balancing BST)", "Hash Table", "Doubly Linked List", "B+ Tree"],
    correctAnswer: 0,
    explanation: "`std::map` stores sorted key-value pairs implemented via a Red-Black Tree, guaranteeing O(log N) lookup, insertion, and deletion. `std::unordered_map` uses a Hash Table with average O(1).",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    id: "pf-13",
    subject: "Programming Fundamentals",
    topic: "Type Systems & Operators",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n  printf("%d", 10 >> 2);\n  return 0;\n}',
    question: "What does this C code output?",
    options: ["2", "5", "40", "0"],
    correctAnswer: 0,
    explanation: "Bitwise right shift `10 >> 2` shifts bits right by 2 positions (equivalent to integer division by 2^2 = 4). 10 / 4 = 2.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    id: "pf-14",
    subject: "Programming Fundamentals",
    topic: "Java Memory & Garbage Collection",
    difficulty: "advanced",
    type: "conceptual",
    question: "Can you guarantee immediate execution of the Garbage Collector in Java by calling `System.gc()`?",
    options: [
      "No, `System.gc()` is merely a hint to the JVM, and the garbage collector runs at its own discretion",
      "Yes, it forces an immediate full GC pause",
      "Yes, but only in Java versions prior to 11",
      "Only if all CPU cores are idle"
    ],
    correctAnswer: 0,
    explanation: "Calling `System.gc()` or `Runtime.getRuntime().gc()` requests the JVM to exert effort toward recycling unused objects, but does not guarantee execution timing or completion.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "pf-15",
    subject: "Programming Fundamentals",
    topic: "Python Data Structures & Scope",
    difficulty: "advanced",
    type: "code_output",
    codeSnippet: "funcs = [lambda x: x * i for i in range(3)]\nprint([f(2) for f in funcs])",
    question: "What is the output of this Python snippet due to late binding in closures?",
    options: ["[4, 4, 4]", "[0, 2, 4]", "[0, 1, 2]", "[2, 4, 6]"],
    correctAnswer: 0,
    explanation: "In Python, closures bind variables by reference (late binding). When the lambdas are called, the loop has completed and `i` equals 2 for all of them. Each lambda computes 2 * 2 = 4.",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "pf-16",
    subject: "Programming Fundamentals",
    topic: "C Language Pointers & Memory",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the return type of the `sizeof` operator in C/C++?",
    options: ["size_t", "int", "long", "unsigned short"],
    correctAnswer: 0,
    explanation: "`sizeof` evaluates at compile time to an unsigned integral type `size_t` (defined in `<stddef.h>`), representing object byte sizes portably across 32-bit and 64-bit systems.",
    companyTags: ["TCS", "Infosys"]
  },
  // ==========================================
  // 7. SQL (16 Questions)
  // ==========================================
  {
    id: "sql-01",
    subject: "SQL",
    topic: "Basic Queries (SELECT, WHERE, ORDER BY)",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "SELECT DISTINCT department FROM employees WHERE salary > 50000;",
    question: "What is the purpose of the `DISTINCT` keyword in this SQL query?",
    options: [
      "Removes duplicate department names from the result set",
      "Sorts departments in descending order",
      "Limits results to the first matching row",
      "Filters departments with null values only"
    ],
    correctAnswer: 0,
    explanation: "`DISTINCT` eliminates duplicate rows from the final query projection, ensuring each unique department name appears only once in the output.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "sql-02",
    subject: "SQL",
    topic: "Aggregations & GROUP BY",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the difference between the `WHERE` clause and the `HAVING` clause in SQL?",
    options: [
      "`WHERE` filters individual rows before grouping; `HAVING` filters grouped rows after aggregation",
      "`WHERE` can only be used with numbers; `HAVING` with strings",
      "`HAVING` executes before `WHERE` in query execution order",
      "They are completely interchangeable aliases"
    ],
    correctAnswer: 0,
    explanation: "The `WHERE` clause filters individual records before any grouping occurs. The `HAVING` clause filters aggregated grouped results (e.g. `HAVING COUNT(*) > 5`).",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "sql-03",
    subject: "SQL",
    topic: "JOIN Operations",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which SQL JOIN returns all rows from the left table, and matching rows from the right table (filling with NULL if no match exists)?",
    options: ["LEFT JOIN (or LEFT OUTER JOIN)", "INNER JOIN", "RIGHT JOIN", "CROSS JOIN"],
    correctAnswer: 0,
    explanation: "A LEFT OUTER JOIN preserves every row from the left table. If no corresponding record exists in the right table for the join condition, NULLs are supplied for right table columns.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "sql-04",
    subject: "SQL",
    topic: "JOIN Operations",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "-- Table A has 3 rows: {1, 2, 3}\n-- Table B has 4 rows: {10, 20, 30, 40}\nSELECT * FROM A CROSS JOIN B;",
    question: "How many total rows will the Cartesian product (CROSS JOIN) of Table A and Table B produce?",
    options: ["12", "7", "4", "3"],
    correctAnswer: 0,
    explanation: "A CROSS JOIN produces the Cartesian product of both tables. Total rows = (rows in A) * (rows in B) = 3 * 4 = 12 rows.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "sql-05",
    subject: "SQL",
    topic: "Subqueries & Nested Queries",
    difficulty: "intermediate",
    type: "scenario",
    question: "How do you find the second highest salary from an `employees` table in standard SQL?",
    options: [
      "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
      "SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
      "SELECT MIN(salary) FROM employees WHERE salary > 2;",
      "SELECT SECOND_HIGHEST(salary) FROM employees;"
    ],
    correctAnswer: 0,
    explanation: "The inner subquery `(SELECT MAX(salary) FROM employees)` gets the absolute highest salary. The outer query finds the maximum salary strictly less than that, giving the 2nd highest salary portably.",
    companyTags: ["TCS", "Infosys", "Amazon"]
  },
  {
    id: "sql-06",
    subject: "SQL",
    topic: "Constraints & Keys",
    difficulty: "beginner",
    type: "conceptual",
    question: "Can a column defined with a `PRIMARY KEY` constraint contain `NULL` values in a relational database?",
    options: [
      "No, a Primary Key column strictly enforces UNIQUE and NOT NULL constraints",
      "Yes, it can contain up to one NULL value",
      "Yes, if defined with the NULLABLE keyword",
      "Only in SQLite"
    ],
    correctAnswer: 0,
    explanation: "By relational database definition, a Primary Key must uniquely identify every entity row and cannot contain NULL values under any circumstance (Entity Integrity).",
    companyTags: ["Cognizant", "Wipro"]
  },
  {
    id: "sql-07",
    subject: "SQL",
    topic: "Aggregations & GROUP BY",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id HAVING COUNT(*) > 3;",
    question: "What records will this query output?",
    options: [
      "Department IDs having strictly more than 3 employees, along with their headcount",
      "All employees with an ID greater than 3",
      "The top 3 departments with the highest salary",
      "Departments where salary is greater than 3"
    ],
    correctAnswer: 0,
    explanation: "`GROUP BY dept_id` aggregates records by department. `HAVING COUNT(*) > 3` filters out groups with 3 or fewer members, displaying only departments having >3 employees.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "sql-08",
    subject: "SQL",
    topic: "Window Functions",
    difficulty: "advanced",
    type: "scenario",
    question: "What is the difference between `RANK()` and `DENSE_RANK()` window functions when duplicate ranking values occur?",
    options: [
      "`RANK()` skips subsequent rank numbers after ties (e.g., 1, 2, 2, 4); `DENSE_RANK()` does not skip numbers (e.g., 1, 2, 2, 3)",
      "`DENSE_RANK()` sorts in reverse",
      "`RANK()` only works on integer columns",
      "They produce identical results in all SQL engines"
    ],
    correctAnswer: 0,
    explanation: "`RANK()` leaves gaps after ties reflecting total preceding elements. `DENSE_RANK()` assigns consecutive integers without gaps, so after two tied ranks of 2, the next rank is 3.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "sql-09",
    subject: "SQL",
    topic: "Basic Queries (SELECT, WHERE, ORDER BY)",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "SELECT * FROM students WHERE name LIKE 'A%a';",
    question: "What names match the SQL pattern `A%a` in the `LIKE` clause?",
    options: [
      'Any name starting with uppercase "A" and ending with lowercase "a"',
      'Any name containing only "A" and "a"',
      'Any name starting with "a"',
      "Names with exactly three characters"
    ],
    correctAnswer: 0,
    explanation: 'In SQL LIKE patterns, `%` matches zero or more characters. `A%a` matches any string that begins with "A" and concludes with "a" (e.g., "Anna", "Ananya").',
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "sql-10",
    subject: "SQL",
    topic: "Constraints & Keys",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What does the SQL command `TRUNCATE TABLE employees;` do compared to `DELETE FROM employees;`?",
    options: [
      "`TRUNCATE` is a DDL operation that deallocates data pages instantly without row-by-row logging and cannot be filtered with WHERE",
      "`TRUNCATE` drops the table schema definition completely from database catalog",
      "`DELETE` is faster than `TRUNCATE`",
      "`TRUNCATE` only removes foreign keys"
    ],
    correctAnswer: 0,
    explanation: "`TRUNCATE` is a DDL command that deallocates storage pages, resets auto-increment counters, and is significantly faster because it avoids writing individual row deletions to the transaction log.",
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    id: "sql-11",
    subject: "SQL",
    topic: "Window Functions",
    difficulty: "advanced",
    type: "code_output",
    codeSnippet: "SELECT emp_name, salary,\n       ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rn\nFROM employees;",
    question: "What does the column `rn` represent in this query output?",
    options: [
      "The sequential rank (1, 2, 3...) of an employee\u2019s salary within their own department",
      "The total number of employees in the company",
      "The average salary of the department",
      "A random identifier for each row"
    ],
    correctAnswer: 0,
    explanation: "`PARTITION BY dept_id` splits the window by department. `ORDER BY salary DESC` orders them highest to lowest. `ROW_NUMBER()` assigns 1, 2, 3... independently per department.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "sql-12",
    subject: "SQL",
    topic: "Subqueries & Nested Queries",
    difficulty: "advanced",
    type: "conceptual",
    question: 'What is a "Correlated Subquery" in SQL?',
    options: [
      "A subquery that references column values from the outer query and evaluates once for each row processed by the outer query",
      "A subquery executed once before the outer query runs",
      "A query joining two unrelated databases",
      "A query that creates temporary tables"
    ],
    correctAnswer: 0,
    explanation: "A correlated subquery depends on values from the outer query row. Because it relies on external row state, it cannot be evaluated independently and re-executes for each candidate row.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "sql-13",
    subject: "SQL",
    topic: "Basic Queries (SELECT, WHERE, ORDER BY)",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "SELECT * FROM users WHERE age IS NULL;",
    question: "Why must `IS NULL` be used instead of `= NULL` when filtering missing values in SQL?",
    options: [
      "In SQL three-valued logic, `NULL = NULL` evaluates to UNKNOWN (not TRUE)",
      "`= NULL` is a syntax error in all SQL engines",
      "`IS NULL` converts values to zero",
      "Both are 100% equivalent in standard SQL"
    ],
    correctAnswer: 0,
    explanation: "In ANSI SQL three-valued logic (TRUE, FALSE, UNKNOWN), comparing any value with NULL using `=` yields UNKNOWN. The specialized predicate `IS NULL` or `IS NOT NULL` must be used.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "sql-14",
    subject: "SQL",
    topic: "JOIN Operations",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What is a Self Join in SQL?",
    options: [
      "A table joined with itself using table aliases to compare rows within the same table (e.g. employee to manager)",
      "A join that automatically detects foreign keys",
      "A join requiring no ON condition",
      "A union of two tables"
    ],
    correctAnswer: 0,
    explanation: "A Self Join occurs when a table is joined to itself (e.g. `FROM employees e JOIN employees m ON e.manager_id = m.emp_id`), useful for hierarchical and tree-structured data.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "sql-15",
    subject: "SQL",
    topic: "Constraints & Keys",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What does the `ON DELETE CASCADE` clause specify for a foreign key constraint?",
    options: [
      "When a row in the parent table is deleted, all matching referencing rows in the child table are automatically deleted as well",
      "Deletions on the child table delete the parent table",
      "Deletions are prevented if foreign keys exist",
      "The parent row is set to NULL"
    ],
    correctAnswer: 0,
    explanation: "`ON DELETE CASCADE` automatically propagates parent row deletions to child rows sharing that foreign key, preventing orphaned records without requiring manual child deletions first.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "sql-16",
    subject: "SQL",
    topic: "Aggregations & GROUP BY",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "SELECT COUNT(*), COUNT(commission) FROM employees;",
    question: "If a table has 10 employees and 4 of them have NULL commission, what does this query output?",
    options: ["10 and 6", "10 and 10", "6 and 6", "10 and 4"],
    correctAnswer: 0,
    explanation: "`COUNT(*)` counts total rows in the table (10). `COUNT(column_name)` ignores NULL values and counts only rows where the specified column is not null: 10 - 4 = 6.",
    companyTags: ["Infosys", "Accenture"]
  },
  // ==========================================
  // 8. WEB DEVELOPMENT (16 Questions)
  // ==========================================
  {
    id: "web-01",
    subject: "Web Development",
    topic: "Semantic HTML & Accessibility",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which HTML5 element should be used to wrap major navigational blocks containing site links?",
    options: ["<nav>", "<section>", "<header>", "<aside>"],
    correctAnswer: 0,
    explanation: "The `<nav>` semantic tag designates major navigation link sections, aiding screen readers, assistive accessibility tools, and search engine crawlers.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "web-02",
    subject: "Web Development",
    topic: "CSS Box Model & Flexbox/Grid",
    difficulty: "beginner",
    type: "conceptual",
    question: "When `box-sizing: border-box;` is declared on an element with `width: 200px`, `padding: 20px`, and `border: 5px solid black`, what is its total rendered width in the viewport?",
    options: ["200px", "250px", "240px", "225px"],
    correctAnswer: 0,
    explanation: "With `border-box`, padding and borders are absorbed inside the declared 200px width (content width shrinks to 200 - 40 - 10 = 150px). Total rendered width remains exactly 200px.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "web-03",
    subject: "Web Development",
    topic: "JavaScript Event Loop & Async",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");',
    question: "In what exact order are the letters logged to the console in the JavaScript runtime?",
    options: ["A, D, C, B", "A, B, C, D", "A, D, B, C", "C, A, D, B"],
    correctAnswer: 0,
    explanation: '1. Synchronous code executes first: "A" then "D". 2. Microtask queue (Promises) executes before macrotasks: "C". 3. Macrotask queue (setTimeout) executes: "B". Output: A, D, C, B.',
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "web-04",
    subject: "Web Development",
    topic: "JavaScript Event Loop & Async",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What is a JavaScript "Closure"?',
    options: [
      "A function bundled together with references to its surrounding lexical environment (accessing outer variables even after the outer function has returned)",
      "A method that closes the browser window",
      "A tag that terminates an HTML document",
      "An asynchronous callback with a timeout"
    ],
    correctAnswer: 0,
    explanation: "A closure is created when an inner function references variables from its enclosing lexical scope. The inner function retains access to those variables even after the outer function finishes executing.",
    companyTags: ["Cognizant", "TCS Digital"]
  },
  {
    id: "web-05",
    subject: "Web Development",
    topic: "REST API Concepts & HTTP Methods",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which HTTP method should be used according to RESTful conventions when creating a brand-new resource on a server?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correctAnswer: 0,
    explanation: "In RESTful architecture: POST creates a new resource, GET retrieves resources, PUT/PATCH updates existing resources, and DELETE removes resources.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "web-06",
    subject: "Web Development",
    topic: "Browser Storage & Cookies",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the key difference between browser `localStorage` and `sessionStorage`?",
    options: [
      "`localStorage` persists until explicitly cleared; `sessionStorage` is cleared automatically when the browser tab/session closes",
      "`sessionStorage` has a 50GB limit",
      "`localStorage` data is automatically sent to the server with every HTTP request header",
      "There is no functional difference"
    ],
    correctAnswer: 0,
    explanation: "`localStorage` stores data with no expiration time across browser restarts. `sessionStorage` scoped data is purged as soon as the specific browser tab or window session closes.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "web-07",
    subject: "Web Development",
    topic: "CSS Box Model & Flexbox/Grid",
    difficulty: "beginner",
    type: "conceptual",
    question: "In CSS Flexbox, which property aligns flex items along the primary main axis?",
    options: ["justify-content", "align-items", "flex-wrap", "align-content"],
    correctAnswer: 0,
    explanation: "`justify-content` defines how space is distributed between and around flex items along the main axis. `align-items` governs alignment along the perpendicular cross axis.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "web-08",
    subject: "Web Development",
    topic: "DOM Manipulation",
    difficulty: "intermediate",
    type: "scenario",
    question: 'What is "Event Delegation" in client-side JavaScript?',
    options: [
      "Attaching a single event listener to a common parent element to handle events triggered on multiple child elements via event bubbling",
      "Delegating server requests to a background Web Worker",
      "Deleting event handlers when DOM nodes are removed",
      "Routing network events through a reverse proxy"
    ],
    correctAnswer: 0,
    explanation: "Event Delegation takes advantage of Event Bubbling: instead of binding 500 listeners to 500 list items, one listener on the parent `<ul>` handles events using `event.target`, saving significant memory.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "web-09",
    subject: "Web Development",
    topic: "JavaScript Event Loop & Async",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: "console.log(typeof null);\nconsole.log(typeof undefined);",
    question: "What does this JavaScript code output?",
    options: ['"object" and "undefined"', '"null" and "undefined"', '"object" and "object"', '"undefined" and "undefined"'],
    correctAnswer: 0,
    explanation: 'In JavaScript, `typeof null` returns `"object"` (a well-known historical language design bug preserved for backwards compatibility), whereas `typeof undefined` correctly returns `"undefined"`.',
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "web-010",
    subject: "Web Development",
    topic: "CSS Box Model & Flexbox/Grid",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Which of the following CSS selectors has the highest specificity weight?",
    options: [
      "An ID selector (`#header`)",
      "A Class selector (`.navigation`)",
      "An Element type selector (`header`)",
      "The Universal selector (`*`)"
    ],
    correctAnswer: 0,
    explanation: "CSS specificity hierarchy: Inline styles (1000) > ID selectors (0100) > Class/Attribute/Pseudo-class selectors (0010) > Element/Pseudo-element selectors (0001) > Universal (0000).",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "web-11",
    subject: "Web Development",
    topic: "JavaScript Event Loop & Async",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "const arr = [1, 2, 3];\nconst mapped = arr.map(x => x * 2);\nconsole.log(arr.length, mapped.length);",
    question: "Does the standard JavaScript `Array.prototype.map()` mutate the original array in place?",
    options: [
      'No, `map()` returns a brand-new array without altering the original array; prints "3 3"',
      'Yes, `map()` clears the original array; prints "0 3"',
      'Yes, it mutates in place; prints "6 6"',
      "It throws a TypeError"
    ],
    correctAnswer: 0,
    explanation: "`map()` is a pure functional array method that constructs and returns a new transformed array without modifying the source array. Both arrays retain length 3.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "web-12",
    subject: "Web Development",
    topic: "REST API Concepts & HTTP Methods",
    difficulty: "advanced",
    type: "conceptual",
    question: 'What does it mean for an HTTP method (like GET or DELETE) to be "Idempotent"?',
    options: [
      "Making multiple identical requests has the same intended effect on the server state as making a single request",
      "The request cannot be intercepted by proxies",
      "The request is executed strictly in under 100 milliseconds",
      "The request never returns response bodies"
    ],
    correctAnswer: 0,
    explanation: "An idempotent HTTP method (GET, HEAD, PUT, DELETE, OPTIONS) can be called repeatedly without changing the outcome beyond the initial application. POST is non-idempotent (creates duplicates).",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "web-13",
    subject: "Web Development",
    topic: "Browser Storage & Cookies",
    difficulty: "advanced",
    type: "scenario",
    question: "Why should sensitive authentication JWT tokens be stored in `HttpOnly` cookies rather than `localStorage`?",
    options: [
      "`HttpOnly` cookies cannot be accessed or stolen by malicious JavaScript code during Cross-Site Scripting (XSS) attacks",
      "`HttpOnly` cookies encrypt data on client devices",
      "`localStorage` cannot hold more than 16 characters",
      "`HttpOnly` cookies require no internet connection"
    ],
    correctAnswer: 0,
    explanation: "`localStorage` is completely readable by any client script running on the page. If the site suffers an XSS vulnerability, attackers can steal auth tokens. `HttpOnly` flags prevent JavaScript access.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "web-14",
    subject: "Web Development",
    topic: "Semantic HTML & Accessibility",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the purpose of the `alt` attribute on an `<img>` tag?",
    options: [
      "Provides alternative text for visually impaired screen-reader users and renders when images fail to load",
      "Sets image pixel height",
      "Loads an alternative CSS stylesheet",
      "Rotates the image 90 degrees"
    ],
    correctAnswer: 0,
    explanation: "The `alt` attribute provides descriptive text for screen readers (accessibility) and is displayed when network failure or broken paths prevent image rendering.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "web-15",
    subject: "Web Development",
    topic: "JavaScript Event Loop & Async",
    difficulty: "advanced",
    type: "code_output",
    codeSnippet: "async function getData() {\n  return 42;\n}\nconst res = getData();\nconsole.log(res instanceof Promise);",
    question: "What does this JavaScript code output?",
    options: ["true", "false", "undefined", "TypeError"],
    correctAnswer: 0,
    explanation: "An `async` function always wraps its return value in a resolved Promise. Calling `getData()` returns a Promise object resolving to 42, so `res instanceof Promise` evaluates to true.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "web-16",
    subject: "Web Development",
    topic: "CSS Box Model & Flexbox/Grid",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which CSS property is used to change text from lowercase to uppercase without altering the underlying HTML text?",
    options: ["text-transform: uppercase;", "font-style: uppercase;", "text-decoration: caps;", "font-weight: bold;"],
    correctAnswer: 0,
    explanation: "`text-transform: uppercase` instructs the browser rendering engine to display text in capital letters while preserving the source markup content untouched.",
    companyTags: ["Accenture", "Cognizant"]
  },
  // ==========================================
  // 9. CODING AND DEBUGGING (16 Questions)
  // ==========================================
  {
    id: "debug-01",
    subject: "Coding and Debugging",
    topic: "Off-by-One & Index Errors",
    difficulty: "beginner",
    type: "debugging",
    codeSnippet: 'int arr[5] = {10, 20, 30, 40, 50};\nfor (int i = 0; i <= 5; i++) {\n    printf("%d ", arr[i]);\n}',
    question: "What bug exists in this C loop iterating over a 5-element array?",
    options: [
      "Off-by-one error: `i <= 5` attempts to access `arr[5]`, which is out of bounds (valid indices are 0 to 4)",
      "The loop never executes because `i` starts at 0",
      "`arr[5]` cannot be printed with `%d`",
      "`i++` causes a compiler error"
    ],
    correctAnswer: 0,
    explanation: "In zero-indexed arrays of size N, valid indices are 0 to N-1. The loop condition `i <= 5` accesses `arr[5]`, reading out-of-bounds memory and causing undefined behavior.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "debug-02",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 1, b = 2;\n    if (a = b)\n        printf("Equal");\n    else\n        printf("Not Equal");\n    return 0;\n}',
    question: "What is printed by this C program?",
    options: ["Equal", "Not Equal", "Compilation Error", "0"],
    correctAnswer: 0,
    explanation: 'The condition uses assignment `=` instead of comparison `==`. `a = b` assigns 2 to `a`. Since 2 is non-zero, the condition evaluates to true and prints "Equal".',
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "debug-03",
    subject: "Coding and Debugging",
    topic: "Infinite Loops & Recursion",
    difficulty: "intermediate",
    type: "debugging",
    codeSnippet: "int factorial(int n) {\n    return n * factorial(n - 1);\n}",
    question: "What fatal runtime error will occur when calling `factorial(4)`?",
    options: [
      "Stack Overflow error due to infinite recursion (missing base condition)",
      "Segmentation fault because n is negative",
      "Memory leak in the heap",
      "The code compiles and outputs 24"
    ],
    correctAnswer: 0,
    explanation: "The recursive function lacks a base case (e.g. `if (n <= 1) return 1;`). Calls continue endlessly: factorial(0), factorial(-1)... until stack memory exhausts and causes a Stack Overflow.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "debug-04",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    for (int i = 0; i < 5; i++) {\n        if (i == 3) continue;\n        x += i;\n    }\n    cout << x;\n    return 0;\n}",
    question: "What value is printed by this C++ program?",
    options: ["7", "10", "4", "6"],
    correctAnswer: 0,
    explanation: "The loop iterates i = 0, 1, 2, 3, 4. When i == 3, `continue` skips addition. So x = 0 + 1 + 2 + 4 = 7.",
    companyTags: ["Cognizant", "Accenture"]
  },
  {
    id: "debug-05",
    subject: "Coding and Debugging",
    topic: "Scope & Shadowing Bugs",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint x = 100;\nvoid test() {\n    int x = 20;\n    printf("%d ", x);\n}\nint main() {\n    test();\n    printf("%d", x);\n    return 0;\n}',
    question: "What is the output of this C program?",
    options: ["20 100", "100 100", "20 20", "Compilation Error"],
    correctAnswer: 0,
    explanation: "Inside `test()`, the local variable `x = 20` shadows the global `x = 100`, printing 20. Back in `main()`, the global variable is unshadowed and prints 100.",
    companyTags: ["Infosys", "TCS"]
  },
  {
    id: "debug-06",
    subject: "Coding and Debugging",
    topic: "Pointer & Memory Leaks",
    difficulty: "advanced",
    type: "debugging",
    codeSnippet: "void process() {\n    int *ptr = (int *)malloc(100 * sizeof(int));\n    // operations performed on ptr\n    return;\n}",
    question: "What serious defect is present in the `process()` function?",
    options: [
      "Memory Leak: Allocated heap memory is never freed with `free(ptr)` before the pointer variable falls out of scope",
      "Segmentation Fault upon return",
      "Buffer underflow error",
      "Illegal casting syntax"
    ],
    correctAnswer: 0,
    explanation: "Memory allocated via `malloc` resides on the heap. When `process()` returns without calling `free(ptr)`, the pointer `ptr` is destroyed, leaving the 400 bytes permanently inaccessible on the heap (Memory Leak).",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    id: "debug-07",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: 'let a = [1, 2, 3];\nlet b = "1,2,3";\nconsole.log(a == b);',
    question: "What is the output in JavaScript due to loose equality type coercion?",
    options: ["true", "false", "TypeError", "undefined"],
    correctAnswer: 0,
    explanation: 'Loose equality `==` coerces the array `a` to a primitive via `a.toString()`, which returns `"1,2,3"`. Since `"1,2,3" == "1,2,3"`, it evaluates to `true`. Using `===` would yield `false`.',
    companyTags: ["TCS", "Cognizant"]
  },
  {
    id: "debug-08",
    subject: "Coding and Debugging",
    topic: "Infinite Loops & Recursion",
    difficulty: "beginner",
    type: "debugging",
    codeSnippet: 'int i = 10;\nwhile (i > 0) {\n    printf("%d ", i);\n    // missing i--\n}',
    question: "What will happen during the execution of this code snippet?",
    options: [
      "It creates an Infinite Loop printing 10 continuously because loop counter `i` is never decremented",
      "It prints numbers from 10 down to 1",
      "It throws a compile-time syntax error",
      "It exits immediately"
    ],
    correctAnswer: 0,
    explanation: "Without an update statement (`i--`), the loop condition `i > 0` remains permanently true (10 > 0), causing an infinite loop.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    id: "debug-09",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n    char str[] = "SkillSync\\0Placement";\n    printf("%s", str);\n    return 0;\n}',
    question: "What does this C program print?",
    options: ["SkillSync", "SkillSyncPlacement", "SkillSync\\0Placement", "Compilation Error"],
    correctAnswer: 0,
    explanation: 'In C, strings are null-terminated. `printf("%s")` stops reading characters as soon as it encounters the first null byte `\\0`. Therefore, only "SkillSync" is printed.',
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "debug-10",
    subject: "Coding and Debugging",
    topic: "Pointer & Memory Leaks",
    difficulty: "advanced",
    type: "debugging",
    codeSnippet: "int *getPtr() {\n    int num = 42;\n    return &num;\n}",
    question: "Why is returning `&num` from `getPtr()` a severe bug in C/C++?",
    options: [
      "`num` is an automatic stack variable destroyed upon function return; the returned pointer becomes a Dangling Pointer",
      "C functions cannot return pointer types",
      "`&num` must be cast to `void*`",
      "The number 42 cannot be referenced"
    ],
    correctAnswer: 0,
    explanation: "Local stack variables exist only while their function frame is active. Returning the address of a local stack variable returns a dangling pointer to reclaimed memory, leading to unpredictable crashes.",
    companyTags: ["Amazon", "Google"]
  },
  {
    id: "debug-11",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: 'int x = 5;\nswitch(x) {\n    case 5: printf("Five ");\n    case 6: printf("Six ");\n    default: printf("Default");\n}',
    question: "What is the output due to the absence of `break` statements?",
    options: ["Five Six Default", "Five ", "Five Six", "Default"],
    correctAnswer: 0,
    explanation: 'Without `break;` statements, execution "falls through" into subsequent cases regardless of their condition. Starting from case 5, it prints "Five Six Default".',
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "debug-12",
    subject: "Coding and Debugging",
    topic: "Off-by-One & Index Errors",
    difficulty: "intermediate",
    type: "debugging",
    codeSnippet: "int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        // ...\n    }\n}",
    question: "What subtle bug can occur in `int mid = (low + high) / 2;` for very large arrays in C/Java?",
    options: [
      "Integer Overflow if `low + high` exceeds `INT_MAX`, turning negative; should be written as `low + (high - low) / 2`",
      "`mid` will round incorrectly",
      "Divide-by-zero exception",
      "Bitwise underflow"
    ],
    correctAnswer: 0,
    explanation: "If `low + high` exceeds the maximum 32-bit signed integer value (2,147,483,647), it overflows into a negative number, causing out-of-bounds indexing. `low + (high - low) / 2` avoids overflow.",
    companyTags: ["Google", "Amazon"]
  },
  {
    id: "debug-13",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "intermediate",
    type: "code_output",
    codeSnippet: 'print(bool("False") == False)',
    question: "What is printed by this Python statement?",
    options: ["False", "True", "TypeError", "None"],
    correctAnswer: 0,
    explanation: '`"False"` is a non-empty string. In Python, any non-empty string evaluates to boolean `True` (truthy). Thus `bool("False")` is `True`. `True == False` evaluates to `False`.',
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    id: "debug-14",
    subject: "Coding and Debugging",
    topic: "Scope & Shadowing Bugs",
    difficulty: "advanced",
    type: "debugging",
    codeSnippet: "for (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 100);\n}",
    question: "Why does this JavaScript snippet print `3 3 3` instead of `0 1 2`, and how is it fixed?",
    options: [
      "`var` is function-scoped; replace `var` with block-scoped `let` to bind a new `i` per iteration",
      "`setTimeout` cannot accept arrow functions",
      "The delay is too short; increase to 1000ms",
      "Replace `console.log` with `alert`"
    ],
    correctAnswer: 0,
    explanation: "Because `var` is function-scoped, a single shared `i` variable exists. By the time callbacks run, the loop has completed with `i = 3`. Using `let i` creates a fresh binding per loop iteration.",
    companyTags: ["Amazon", "Flipkart"]
  },
  {
    id: "debug-15",
    subject: "Coding and Debugging",
    topic: "Output Prediction",
    difficulty: "beginner",
    type: "code_output",
    codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 0;\n    if (a)\n        printf("True");\n    else\n        printf("False");\n    return 0;\n}',
    question: "What does this C code output?",
    options: ["False", "True", "Compilation Error", "0"],
    correctAnswer: 0,
    explanation: 'In C, an integer value of 0 is treated as Boolean `false`. Any non-zero integer is treated as `true`. Since `a == 0`, the `else` branch executes printing "False".',
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "debug-16",
    subject: "Coding and Debugging",
    topic: "Pointer & Memory Leaks",
    difficulty: "intermediate",
    type: "debugging",
    codeSnippet: `char *str = "Hello";
str[0] = 'h';`,
    question: "What happens when attempting to modify `str[0]` in this C program?",
    options: [
      "Segmentation fault (bus error) because string literals are stored in read-only data segments",
      'The string becomes "hello" successfully',
      "Compiler warning only, executes normally",
      "Character 'h' is appended to the end"
    ],
    correctAnswer: 0,
    explanation: 'String literals like `"Hello"` reside in read-only memory (RODATA). Writing to read-only memory triggers a Segmentation Fault. To allow mutation, declare as an array: `char str[] = "Hello";`.',
    companyTags: ["Infosys", "TCS Digital"]
  },
  // ==========================================
  // 10. QUANTITATIVE APTITUDE (16 Questions)
  // ==========================================
  {
    id: "quant-01",
    subject: "Quantitative Aptitude",
    topic: "Percentages & Profit-Loss",
    difficulty: "beginner",
    type: "numerical",
    question: "A shopkeeper buys an article for \u20B9800 and sells it for \u20B91000. What is his profit percentage?",
    options: ["25%", "20%", "15%", "30%"],
    correctAnswer: 0,
    explanation: "Profit = Selling Price - Cost Price = 1000 - 800 = \u20B9200. Profit % = (Profit / Cost Price) * 100 = (200 / 800) * 100 = 25%.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "quant-02",
    subject: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "beginner",
    type: "numerical",
    question: "A train 150 meters long is running at a speed of 54 km/h. How many seconds will it take to pass a stationary telegraph post?",
    options: ["10 seconds", "12 seconds", "15 seconds", "8 seconds"],
    correctAnswer: 0,
    explanation: "Speed in m/s = 54 * (5/18) = 15 m/s. Time to pass post = Distance / Speed = 150 m / 15 m/s = 10 seconds.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "quant-03",
    subject: "Quantitative Aptitude",
    topic: "Time & Work",
    difficulty: "beginner",
    type: "numerical",
    question: "A can complete a piece of work in 12 days and B can complete the same work in 24 days. Working together, in how many days can they finish the work?",
    options: ["8 days", "6 days", "10 days", "16 days"],
    correctAnswer: 0,
    explanation: "One day work of A = 1/12. One day work of B = 1/24. Combined one day work = 1/12 + 1/24 = 3/24 = 1/8. Total days = 8 days.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "quant-04",
    subject: "Quantitative Aptitude",
    topic: "Ratio & Proportion",
    difficulty: "beginner",
    type: "numerical",
    question: "If A : B = 3 : 4 and B : C = 8 : 9, what is the ratio A : C?",
    options: ["2 : 3", "1 : 2", "3 : 2", "4 : 5"],
    correctAnswer: 0,
    explanation: "(A / C) = (A / B) * (B / C) = (3 / 4) * (8 / 9) = 24 / 36 = 2 / 3. Hence A : C = 2 : 3.",
    companyTags: ["Wipro", "TCS"]
  },
  {
    id: "quant-05",
    subject: "Quantitative Aptitude",
    topic: "Simple & Compound Interest",
    difficulty: "intermediate",
    type: "numerical",
    question: "What is the Simple Interest on a principal sum of \u20B95000 invested at 8% annual rate for 3 years?",
    options: ["\u20B91200", "\u20B91500", "\u20B91000", "\u20B91400"],
    correctAnswer: 0,
    explanation: "SI = (P * R * T) / 100 = (5000 * 8 * 3) / 100 = \u20B91200.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "quant-06",
    subject: "Quantitative Aptitude",
    topic: "Permutation & Combination",
    difficulty: "intermediate",
    type: "numerical",
    question: 'In how many different ways can the letters of the word "LEADER" be arranged?',
    options: ["360", "720", "120", "180"],
    correctAnswer: 0,
    explanation: 'The word "LEADER" contains 6 letters where letter "E" appears 2 times. Total permutations = 6! / 2! = 720 / 2 = 360 ways.',
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "quant-07",
    subject: "Quantitative Aptitude",
    topic: "Probability",
    difficulty: "intermediate",
    type: "numerical",
    question: "Two unbiased dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on top is 7?",
    options: ["1/6", "1/12", "7/36", "5/36"],
    correctAnswer: 0,
    explanation: "Total outcomes = 6 * 6 = 36. Favorable outcomes summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs. Probability = 6 / 36 = 1/6.",
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    id: "quant-08",
    subject: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "intermediate",
    type: "numerical",
    question: "A car covers a distance at 60 km/h and returns the same distance at 40 km/h. What is the average speed for the whole round trip?",
    options: ["48 km/h", "50 km/h", "52 km/h", "45 km/h"],
    correctAnswer: 0,
    explanation: "When equal distances are traversed at speeds x and y, Average Speed = 2xy / (x + y) = (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "quant-09",
    subject: "Quantitative Aptitude",
    topic: "Percentages & Profit-Loss",
    difficulty: "intermediate",
    type: "numerical",
    question: "If the price of petrol increases by 25%, by what percentage must a motorist reduce consumption so as not to increase expenditure?",
    options: ["20%", "25%", "16.66%", "15%"],
    correctAnswer: 0,
    explanation: "Reduction % = [R / (100 + R)] * 100 = [25 / (100 + 25)] * 100 = (25 / 125) * 100 = 20%.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "quant-10",
    subject: "Quantitative Aptitude",
    topic: "Simple & Compound Interest",
    difficulty: "advanced",
    type: "numerical",
    question: "What is the difference between Compound Interest and Simple Interest on \u20B910,000 for 2 years at 10% per annum?",
    options: ["\u20B9100", "\u20B950", "\u20B9200", "\u20B9150"],
    correctAnswer: 0,
    explanation: "For 2 years, Difference (CI - SI) = P * (R / 100)\xB2 = 10000 * (10 / 100)\xB2 = 10000 * (1/100) = \u20B9100.",
    companyTags: ["TCS Digital", "Infosys"]
  },
  {
    id: "quant-11",
    subject: "Quantitative Aptitude",
    topic: "Time & Work",
    difficulty: "advanced",
    type: "numerical",
    question: "Pipe A can fill a tank in 10 hours and Pipe B can empty it in 15 hours. If both pipes are opened together, in how many hours will the tank be full?",
    options: ["30 hours", "25 hours", "20 hours", "12 hours"],
    correctAnswer: 0,
    explanation: "Net fill per hour = (1/10) - (1/15) = (3 - 2)/30 = 1/30. The tank will be completely filled in 30 hours.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "quant-12",
    subject: "Quantitative Aptitude",
    topic: "Permutation & Combination",
    difficulty: "advanced",
    type: "numerical",
    question: "From a group of 7 men and 6 women, in how many ways can a committee of 5 persons be formed consisting of 3 men and 2 women?",
    options: ["525", "350", "420", "600"],
    correctAnswer: 0,
    explanation: "Ways = 7C3 * 6C2. 7C3 = (7*6*5)/(3*2*1) = 35. 6C2 = (6*5)/(2*1) = 15. Total ways = 35 * 15 = 525.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "quant-13",
    subject: "Quantitative Aptitude",
    topic: "Percentages & Profit-Loss",
    difficulty: "beginner",
    type: "numerical",
    question: "What is 35% of 800?",
    options: ["280", "260", "300", "240"],
    correctAnswer: 0,
    explanation: "35% of 800 = (35 / 100) * 800 = 35 * 8 = 280.",
    companyTags: ["Wipro", "TCS"]
  },
  {
    id: "quant-14",
    subject: "Quantitative Aptitude",
    topic: "Ratio & Proportion",
    difficulty: "intermediate",
    type: "numerical",
    question: "The ages of two brothers are in the ratio 4 : 5. After 6 years, the ratio becomes 5 : 6. What is the current age of the younger brother?",
    options: ["24 years", "20 years", "28 years", "18 years"],
    correctAnswer: 0,
    explanation: "Let ages be 4x and 5x. (4x + 6) / (5x + 6) = 5 / 6. 6(4x + 6) = 5(5x + 6) => 24x + 36 = 25x + 30 => x = 6. Younger brother = 4 * 6 = 24 years.",
    companyTags: ["Accenture", "Infosys"]
  },
  {
    id: "quant-15",
    subject: "Quantitative Aptitude",
    topic: "Probability",
    difficulty: "beginner",
    type: "numerical",
    question: "A card is drawn from a well-shuffled standard pack of 52 playing cards. What is the probability of getting an Ace?",
    options: ["1/13", "1/52", "1/4", "4/13"],
    correctAnswer: 0,
    explanation: "There are 4 Aces in a 52-card deck. Probability = 4 / 52 = 1/13.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "quant-16",
    subject: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "advanced",
    type: "numerical",
    question: "A boat moves at 10 km/h in still water. If the river stream flows at 2 km/h, what is the boat\u2019s upstream speed and downstream speed respectively?",
    options: ["8 km/h and 12 km/h", "12 km/h and 8 km/h", "10 km/h and 14 km/h", "6 km/h and 10 km/h"],
    correctAnswer: 0,
    explanation: "Upstream speed = Boat - Stream = 10 - 2 = 8 km/h. Downstream speed = Boat + Stream = 10 + 2 = 12 km/h.",
    companyTags: ["Infosys", "Cognizant"]
  },
  // ==========================================
  // 11. LOGICAL REASONING (16 Questions)
  // ==========================================
  {
    id: "lr-01",
    subject: "Logical Reasoning",
    topic: "Number & Letter Series",
    difficulty: "beginner",
    type: "numerical",
    question: "Find the next number in the series: 3, 6, 12, 24, 48, ?",
    options: ["96", "84", "72", "108"],
    correctAnswer: 0,
    explanation: "Each term is obtained by multiplying the preceding number by 2 (geometric progression with r = 2). 48 * 2 = 96.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "lr-02",
    subject: "Logical Reasoning",
    topic: "Coding-Decoding",
    difficulty: "beginner",
    type: "scenario",
    question: 'If in a certain code, "CLOUD" is written as "DMPVE", how is "RAIN" written in that same code?',
    options: ["SBJO", "SBJN", "SCJO", "QZHM"],
    correctAnswer: 0,
    explanation: 'Each letter is shifted forward by +1 position in the alphabet: R->S, A->B, I->J, N->O. Result is "SBJO".',
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "lr-03",
    subject: "Logical Reasoning",
    topic: "Blood Relations",
    difficulty: "beginner",
    type: "scenario",
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ["Father", "Uncle", "Brother", "Grandfather"],
    correctAnswer: 0,
    explanation: `"Only son of my mother" refers to Suresh himself. Therefore, the boy is Suresh's son, which makes Suresh the Father.`,
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "lr-04",
    subject: "Logical Reasoning",
    topic: "Direction Sense",
    difficulty: "beginner",
    type: "scenario",
    question: "A person walks 10 meters North, turns right and walks 10 meters, then turns right again and walks 10 meters. In which direction is he now from his starting point?",
    options: ["East", "West", "North", "South"],
    correctAnswer: 0,
    explanation: "Walking 10m North, then 10m East (right), then 10m South (right) cancels out the North-South movement, leaving him exactly 10 meters East of the origin.",
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "lr-05",
    subject: "Logical Reasoning",
    topic: "Syllogisms",
    difficulty: "intermediate",
    type: "scenario",
    question: "Statements: 1. All cats are dogs. 2. All dogs are birds.\nConclusions:\nI. All cats are birds.\nII. All birds are cats.",
    options: [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both follow",
      "Neither follows"
    ],
    correctAnswer: 0,
    explanation: "Cats is a subset of Dogs, which is a subset of Birds. Therefore, all cats are birds (Conclusion I follows). The converse (all birds are cats) does not logically follow.",
    companyTags: ["Infosys", "TCS"]
  },
  {
    id: "lr-06",
    subject: "Logical Reasoning",
    topic: "Number & Letter Series",
    difficulty: "intermediate",
    type: "numerical",
    question: "Find the missing number in the sequence: 2, 5, 10, 17, 26, ?",
    options: ["37", "35", "36", "38"],
    correctAnswer: 0,
    explanation: "The difference between consecutive terms increases by 2: (+3, +5, +7, +9, +11). 26 + 11 = 37. (Alternatively: n\xB2 + 1 for n = 1, 2, 3, 4, 5, 6: 6\xB2 + 1 = 37).",
    companyTags: ["Cognizant", "Accenture"]
  },
  {
    id: "lr-07",
    subject: "Logical Reasoning",
    topic: "Seating Arrangements",
    difficulty: "intermediate",
    type: "scenario",
    question: "Five friends A, B, C, D, and E are sitting in a row facing North. C is sitting in the exact middle. A is immediately to the left of B, and D is to the right of C. If B is to the left of C, who is at the leftmost end?",
    options: ["A", "B", "D", "E"],
    correctAnswer: 0,
    explanation: "C is in position 3 of 5. Since A is immediately left of B and both are left of C, position 1 is A and position 2 is B. Thus A is at the leftmost end.",
    companyTags: ["Infosys", "Wipro"]
  },
  {
    id: "lr-08",
    subject: "Logical Reasoning",
    topic: "Blood Relations",
    difficulty: "intermediate",
    type: "scenario",
    question: "A is B\u2019s sister. C is B\u2019s mother. D is C\u2019s father. E is D\u2019s mother. How is A related to D?",
    options: ["Granddaughter", "Daughter", "Grandmother", "Niece"],
    correctAnswer: 0,
    explanation: "A is child of C. C is daughter of D. Therefore, A is the Granddaughter of D.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    id: "lr-09",
    subject: "Logical Reasoning",
    topic: "Coding-Decoding",
    difficulty: "intermediate",
    type: "scenario",
    question: 'In a code language, if "MADRAS" is coded as "56", how will "CALCUTTA" be coded using alphabetical position sum (A=1, B=2...)?',
    options: ["82", "76", "84", "90"],
    correctAnswer: 0,
    explanation: "MADRAS = 13 + 1 + 4 + 18 + 1 + 19 = 56. CALCUTTA = C(3) + A(1) + L(12) + C(3) + U(21) + T(20) + T(20) + A(1) = 82.",
    companyTags: ["Infosys", "TCS"]
  },
  {
    id: "lr-10",
    subject: "Logical Reasoning",
    topic: "Direction Sense",
    difficulty: "intermediate",
    type: "numerical",
    question: "A woman walks 3 km West, then turns South and walks 4 km. How far in a direct straight line is she from her starting point?",
    options: ["5 km", "7 km", "4 km", "6 km"],
    correctAnswer: 0,
    explanation: "Using the Pythagorean theorem for perpendicular displacement: Distance = \u221A(3\xB2 + 4\xB2) = \u221A(9 + 16) = \u221A25 = 5 km.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "lr-11",
    subject: "Logical Reasoning",
    topic: "Syllogisms",
    difficulty: "advanced",
    type: "scenario",
    question: "Statements: Some pens are books. All books are pencils.\nConclusions:\nI. Some pencils are pens.\nII. Some pencils are books.",
    options: [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither I nor II follows"
    ],
    correctAnswer: 0,
    explanation: "Since Some Pens are Books, and All Books are Pencils, the common region means Some Pencils are Pens (I is true). Also, since All Books are Pencils, Some Pencils are Books (II is true). Both follow.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "lr-12",
    subject: "Logical Reasoning",
    topic: "Seating Arrangements",
    difficulty: "advanced",
    type: "scenario",
    question: "Six persons P, Q, R, S, T, and U are seated around a circular table facing the center. P is sitting opposite to S. Q is to the immediate right of P. Who is sitting opposite to Q?",
    options: ["T", "U", "R", "Cannot be determined without additional relative positions"],
    correctAnswer: 3,
    explanation: "With 6 persons, opposite means 3 seats away. P is opposite S. Q is immediate right of P. The position opposite Q depends on the arrangement of R, T, and U, which is not fully specified.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "lr-13",
    subject: "Logical Reasoning",
    topic: "Number & Letter Series",
    difficulty: "beginner",
    type: "scenario",
    question: "Find the odd one out: 27, 64, 125, 144, 216",
    options: ["144", "27", "64", "125"],
    correctAnswer: 0,
    explanation: "27 = 3\xB3, 64 = 4\xB3, 125 = 5\xB3, 216 = 6\xB3 are all perfect cubes. 144 is a square (12\xB2), not a cube of an integer.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "lr-14",
    subject: "Logical Reasoning",
    topic: "Data Sufficiency",
    difficulty: "advanced",
    type: "scenario",
    question: "Question: Is X an even number?\nStatement 1: X is divisible by 4.\nStatement 2: X is divisible by 2.",
    options: [
      "Either statement alone is sufficient to answer the question",
      "Statement 1 alone is sufficient, but Statement 2 alone is not",
      "Both statements together are needed",
      "Neither statement is sufficient"
    ],
    correctAnswer: 0,
    explanation: "If X is divisible by 4, it is definitely even (Statement 1 alone is sufficient). If X is divisible by 2, it is also definitely even (Statement 2 alone is sufficient). Either alone works.",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "lr-15",
    subject: "Logical Reasoning",
    topic: "Blood Relations",
    difficulty: "beginner",
    type: "scenario",
    question: 'Anil says, "Rita\u2019s father is the only son of my father." How is Anil related to Rita?',
    options: ["Father", "Brother", "Uncle", "Cousin"],
    correctAnswer: 0,
    explanation: '"The only son of my father" means Anil himself. Thus, Rita\u2019s father is Anil. Anil is her father.',
    companyTags: ["TCS", "Cognizant"]
  },
  {
    id: "lr-16",
    subject: "Logical Reasoning",
    topic: "Coding-Decoding",
    difficulty: "beginner",
    type: "scenario",
    question: "If CAT = 24 and DOG = 26, what is the value of PIG?",
    options: ["32", "30", "34", "28"],
    correctAnswer: 0,
    explanation: "CAT: C(3) + A(1) + T(20) = 24. DOG: D(4) + O(15) + G(7) = 26. PIG: P(16) + I(9) + G(7) = 32.",
    companyTags: ["Wipro", "Infosys"]
  },
  // ==========================================
  // 12. VERBAL ABILITY (16 Questions)
  // ==========================================
  {
    id: "va-01",
    subject: "Verbal Ability",
    topic: "Sentence Correction & Grammar",
    difficulty: "beginner",
    type: "conceptual",
    question: "Identify the grammatically correct sentence:",
    options: [
      "Neither the teacher nor the students were present in the laboratory.",
      "Neither the teacher nor the students was present in the laboratory.",
      "Neither the teacher or the students were present in the laboratory.",
      "Neither the teacher nor the students is present in the laboratory."
    ],
    correctAnswer: 0,
    explanation: 'When subject terms are joined by "neither...nor", the verb agrees with the closer subject ("students", which is plural), requiring the plural past verb "were".',
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "va-02",
    subject: "Verbal Ability",
    topic: "Vocabulary (Synonyms & Antonyms)",
    difficulty: "beginner",
    type: "conceptual",
    question: 'Choose the word that is most nearly SYNONYMOUS with "METICULOUS":',
    options: ["Painstaking and careful", "Hasty and careless", "Ambiguous", "Aggressive"],
    correctAnswer: 0,
    explanation: '"Meticulous" means showing great attention to detail, very careful, thorough, and painstaking.',
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "va-03",
    subject: "Verbal Ability",
    topic: "Vocabulary (Synonyms & Antonyms)",
    difficulty: "beginner",
    type: "conceptual",
    question: 'Choose the word that is the direct ANTONYM of "CANDID":',
    options: ["Deceptive / Guarded", "Frank", "Honest", "Outspoken"],
    correctAnswer: 0,
    explanation: '"Candid" means truthful and straightforward. Its antonym is deceptive, secretive, or guarded.',
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "va-04",
    subject: "Verbal Ability",
    topic: "Sentence Completion",
    difficulty: "beginner",
    type: "conceptual",
    question: "Fill in the blank: The manager was impressed by her _______ approach to solving the client\u2019s escalating problem.",
    options: ["pragmatic", "arbitrary", "negligent", "apathetic"],
    correctAnswer: 0,
    explanation: '"Pragmatic" means dealing with things sensibly and realistically based on practical rather than theoretical considerations, which fits positive context.',
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "va-05",
    subject: "Verbal Ability",
    topic: "Sentence Correction & Grammar",
    difficulty: "intermediate",
    type: "scenario",
    question: 'Which sentence correctly uses "its" vs "it\u2019s"?',
    options: [
      "The company announced its annual revenue growth, and it's higher than expected.",
      "The company announced it's annual revenue growth, and its higher than expected.",
      "The company announced its annual revenue growth, and its higher than expected.",
      "The company announced it's annual revenue growth, and it's higher than expected."
    ],
    correctAnswer: 0,
    explanation: `"Its" is the possessive pronoun (belonging to the company). "It's" is the contraction for "it is" (it is higher).`,
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "va-06",
    subject: "Verbal Ability",
    topic: "Idioms & Phrases",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What is the meaning of the idiom "to burn the midnight oil"?',
    options: [
      "To work or study late into the night",
      "To waste valuable energy recklessly",
      "To set fire to household supplies",
      "To wake up very early before sunrise"
    ],
    correctAnswer: 0,
    explanation: '"Burn the midnight oil" originates from the days of oil lamps, referring to working or studying diligently late into the night.',
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "va-07",
    subject: "Verbal Ability",
    topic: "Sentence Correction & Grammar",
    difficulty: "intermediate",
    type: "scenario",
    question: 'Find the error in the sentence: "One of the delegates have forgotten their official identification card at reception."',
    options: [
      '"have forgotten" should be "has forgotten"',
      '"at reception" should be "on reception"',
      '"their" should be "his/her"',
      "No error exists"
    ],
    correctAnswer: 0,
    explanation: 'The subject of the sentence is the singular pronoun "One" (One of the delegates), which requires the singular auxiliary verb "has forgotten".',
    companyTags: ["Wipro", "Accenture"]
  },
  {
    id: "va-08",
    subject: "Verbal Ability",
    topic: "Vocabulary (Synonyms & Antonyms)",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'Select the synonym for the word "EPHEMERAL":',
    options: ["Transient / Short-lived", "Eternal", "Substantial", "Rigid"],
    correctAnswer: 0,
    explanation: '"Ephemeral" describes something lasting for a very short duration; fleeting, transient, or momentary.',
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    id: "va-09",
    subject: "Verbal Ability",
    topic: "Sentence Completion",
    difficulty: "intermediate",
    type: "conceptual",
    question: "Fill in the blanks: Despite facing _______ economic headwinds, the tech startup managed to remain _______ and profitable.",
    options: [
      "severe, resilient",
      "trivial, fragile",
      "favorable, insolvent",
      "abundant, sluggish"
    ],
    correctAnswer: 0,
    explanation: '"Despite" signals contrast: facing severe headwinds while remaining resilient (able to withstand and recover) creates coherent logic.',
    companyTags: ["TCS Digital", "Infosys"]
  },
  {
    id: "va-10",
    subject: "Verbal Ability",
    topic: "Para Jumbles",
    difficulty: "advanced",
    type: "scenario",
    question: "Reorder the sentences into a coherent paragraph:\nP. This rapid transition created massive demand for cloud security.\nQ. Over the last decade, enterprises migrated infrastructure to remote servers.\nR. Consequently, cybersecurity specialists saw unprecedented salary growth.\nS. Previously, data was retained strictly on localized internal mainframes.",
    options: ["S, Q, P, R", "Q, S, R, P", "P, Q, S, R", "S, P, Q, R"],
    correctAnswer: 0,
    explanation: 'S sets historical baseline ("Previously..."), Q details the change ("Over the last decade..."), P explains the direct outcome ("This rapid transition..."), and R concludes the consequence.',
    companyTags: ["Infosys", "Accenture"]
  },
  {
    id: "va-11",
    subject: "Verbal Ability",
    topic: "Reading Comprehension",
    difficulty: "advanced",
    type: "scenario",
    question: 'Passage: "Algorithmic decision-making often inherits historical biases embedded in training datasets, producing systematic disparities unless actively audited." What is the primary implication of this excerpt?',
    options: [
      "Algorithms are not inherently neutral if trained on historical real-world human data",
      "Computers should never be used for business analytics",
      "Biases disappear automatically over time",
      "Auditing algorithms increases computing latency"
    ],
    correctAnswer: 0,
    explanation: "The excerpt underscores that algorithms reflect the patterns and prejudices within their training corpus, requiring explicit audits to mitigate bias.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "va-12",
    subject: "Verbal Ability",
    topic: "Sentence Correction & Grammar",
    difficulty: "advanced",
    type: "scenario",
    question: 'Which of the following represents a "Dangling Modifier"?',
    options: [
      "Walking through the college gate, the library books dropped out of my backpack.",
      "Walking through the college gate, I dropped my library books.",
      "As I walked through the college gate, the books fell.",
      "The student walked through the gate and dropped books."
    ],
    correctAnswer: 0,
    explanation: 'In option A, the participial phrase "Walking through the college gate" illogically modifies "the library books" (implying the books were walking through the gate).',
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "va-13",
    subject: "Verbal Ability",
    topic: "Vocabulary (Synonyms & Antonyms)",
    difficulty: "beginner",
    type: "conceptual",
    question: 'What is the antonym of "AFFLUENT"?',
    options: ["Impoverished", "Wealthy", "Prosperous", "Generous"],
    correctAnswer: 0,
    explanation: '"Affluent" means wealthy and having great abundance. Its antonym is impoverished, poor, or destitute.',
    companyTags: ["TCS", "Wipro"]
  },
  {
    id: "va-14",
    subject: "Verbal Ability",
    topic: "Sentence Completion",
    difficulty: "beginner",
    type: "conceptual",
    question: "Choose the correct preposition: She has been working as a software developer _______ 2021.",
    options: ["since", "for", "from", "in"],
    correctAnswer: 0,
    explanation: '"Since" is used with the present perfect tense to designate a specific starting point in time (2021). "For" is used for durations (for 3 years).',
    companyTags: ["Accenture", "TCS"]
  },
  {
    id: "va-15",
    subject: "Verbal Ability",
    topic: "Idioms & Phrases",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What does the idiom "take with a grain of salt" mean?',
    options: [
      "To view something with skepticism or not accept it completely as literal truth",
      "To season food carefully",
      "To take criticism deeply to heart",
      "To celebrate a minor accomplishment"
    ],
    correctAnswer: 0,
    explanation: 'To "take something with a grain of salt" means to remain slightly skeptical or not assume a statement is 100% accurate.',
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    id: "va-16",
    subject: "Verbal Ability",
    topic: "Sentence Correction & Grammar",
    difficulty: "beginner",
    type: "conceptual",
    question: 'Which word should fill the blank: "Between you and _______, the project will be delivered on time."',
    options: ["me", "I", "myself", "mine"],
    correctAnswer: 0,
    explanation: '"Between" is a preposition requiring object pronouns. The objective form is "me" ("between you and me"), not the subject pronoun "I".',
    companyTags: ["TCS", "Wipro"]
  },
  // ==========================================
  // 13. COMMUNICATION SKILLS (16 Questions)
  // ==========================================
  {
    id: "comm-01",
    subject: "Communication Skills",
    topic: "Email & Professional Writing",
    difficulty: "beginner",
    type: "conceptual",
    question: "Which of the following is considered best practice when composing a professional email to a corporate recruiter?",
    options: [
      "A concise, informative subject line, polite salutation, clear body paragraphs, and professional sign-off with contact details",
      "All-caps text to show high urgency and excitement",
      'Informal abbreviations like "u r" and "thx" to demonstrate casual friendliness',
      "Leaving the subject line blank to encourage opening the email"
    ],
    correctAnswer: 0,
    explanation: 'Professional email etiquette mandates a descriptive subject line (e.g. "Application for SDE-1 - Priya Sharma"), formal salutation, concise structure, and full contact signature.',
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "comm-02",
    subject: "Communication Skills",
    topic: "STAR Method for Behavioral Interviews",
    difficulty: "beginner",
    type: "conceptual",
    question: "What do the letters in the STAR interview technique represent?",
    options: [
      "Situation, Task, Action, Result",
      "Strengths, Talents, Achievements, Roles",
      "Strategy, Teamwork, Attitude, Resolution",
      "Structure, Timing, Analysis, Review"
    ],
    correctAnswer: 0,
    explanation: "STAR stands for Situation (context), Task (challenge/objective), Action (steps YOU specifically took), and Result (quantifiable positive outcome).",
    companyTags: ["Amazon", "Infosys", "Accenture"]
  },
  {
    id: "comm-03",
    subject: "Communication Skills",
    topic: "Active Listening & Conflict Resolution",
    difficulty: "beginner",
    type: "scenario",
    question: "During a technical interview, what should you do if an interviewer\u2019s problem statement seems ambiguous or incomplete?",
    options: [
      "Pause, ask clarifying questions, and state your assumptions before writing any code",
      "Start coding immediately based on your first guess",
      "Point out that the interviewer made an error in formulating the problem",
      "Remain silent until the interviewer offers hints"
    ],
    correctAnswer: 0,
    explanation: "Interviewers intentionally present underspecified requirements to test requirements gathering. Clarifying scope, constraints, and edge cases demonstrates senior engineering maturity.",
    companyTags: ["Amazon", "Google", "Flipkart"]
  },
  {
    id: "comm-04",
    subject: "Communication Skills",
    topic: "Group Discussion Strategies",
    difficulty: "intermediate",
    type: "scenario",
    question: "What is the most effective strategy to contribute meaningfully in a campus placement Group Discussion (GD)?",
    options: [
      "Speak clearly with structured points, acknowledge others' arguments respectfully, and steer chaotic discussions back to core objectives",
      "Dominate speaking time by interrupting others continuously",
      "Remain silent and only speak in the final 10 seconds to summarize",
      "Argue aggressively to prove opposing participants wrong"
    ],
    correctAnswer: 0,
    explanation: "Recruiters evaluate active listening, collaboration, logical articulation, and leadership. Constructively building on others' points shows team readiness.",
    companyTags: ["TCS", "Wipro", "Cognizant"]
  },
  {
    id: "comm-05",
    subject: "Communication Skills",
    topic: "Non-Verbal & Body Language",
    difficulty: "beginner",
    type: "conceptual",
    question: "During video/virtual interviews, how can a candidate best convey eye contact and engaged attentiveness?",
    options: [
      "Look directly towards the web camera lens while speaking and maintain upright posture",
      "Stare fixedly at the bottom taskbar of the laptop screen",
      "Keep your camera turned off to prevent bandwidth distraction",
      "Continuously adjust lighting during the interview"
    ],
    correctAnswer: 0,
    explanation: "Looking at the camera lens simulates direct eye contact with the interviewer, while upright posture and nodding convey confidence and engagement.",
    companyTags: ["Accenture", "Infosys"]
  },
  {
    id: "comm-06",
    subject: "Communication Skills",
    topic: "STAR Method for Behavioral Interviews",
    difficulty: "intermediate",
    type: "scenario",
    question: 'When asked "Tell me about a time you had a conflict with a team member on a project", what should you highlight in the "Action" and "Result" steps?',
    options: [
      "How you initiated a calm discussion, focused on technical facts rather than personal feelings, reached consensus, and successfully delivered the project",
      "How you reported the colleague to the college department head to get them removed",
      "How you proved your code was superior and ignored their input",
      "That you have never encountered any disagreement with anyone"
    ],
    correctAnswer: 0,
    explanation: "Interviewers look for emotional intelligence, constructive communication, compromise, and focus on team outcomes rather than personal ego.",
    companyTags: ["Amazon", "TCS Digital"]
  },
  {
    id: "comm-07",
    subject: "Communication Skills",
    topic: "Email & Professional Writing",
    difficulty: "beginner",
    type: "conceptual",
    question: "What is the appropriate timeframe to send a concise thank-you follow-up email after an interview?",
    options: [
      "Within 24 hours of the interview",
      "Immediately while walking out of the building",
      "After 3 weeks have passed",
      "Never, as it is considered unprofessional"
    ],
    correctAnswer: 0,
    explanation: "Sending a brief, polite thank-you email within 24 hours reiterating enthusiasm for the role and mentioning a specific discussion point reinforces a positive impression.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    id: "comm-08",
    subject: "Communication Skills",
    topic: "Active Listening & Conflict Resolution",
    difficulty: "intermediate",
    type: "conceptual",
    question: 'What is "Paraphrasing" in active listening during technical discussions?',
    options: [
      "Restating the speaker\u2019s key points in your own words to confirm mutual understanding before proceeding",
      "Copying someone\u2019s code verbatim",
      "Interrupting with a rebuttal",
      "Speaking in another language"
    ],
    correctAnswer: 0,
    explanation: 'Paraphrasing ("So if I understand correctly, we need an algorithm that optimizes memory under 64MB...") proves comprehension and aligns expectations.',
    companyTags: ["Accenture", "Wipro"]
  },
  {
    id: "comm-09",
    subject: "Communication Skills",
    topic: "STAR Method for Behavioral Interviews",
    difficulty: "intermediate",
    type: "scenario",
    question: 'When an interviewer concludes with "Do you have any questions for us?", what is the most constructive response?',
    options: [
      "Inquire about team tech stack challenges, mentorship for freshers, or company engineering culture",
      'Reply "No, I have no questions at all"',
      "Ask immediately about leaves and sick holidays",
      "Ask the interviewer how much money they personally earn"
    ],
    correctAnswer: 0,
    explanation: "Asking thoughtful questions about engineering culture, challenges, or onboarding demonstrates genuine curiosity, research, and long-term interest in the role.",
    companyTags: ["TCS", "Infosys", "Amazon"]
  },
  {
    id: "comm-10",
    subject: "Communication Skills",
    topic: "Email & Professional Writing",
    difficulty: "intermediate",
    type: "scenario",
    question: 'In an email, what is the proper functional use of the "Bcc" (Blind Carbon Copy) field?',
    options: [
      "Sending an email to a group of recipients while protecting their privacy so they cannot see each other\u2019s email addresses",
      "Replying to all recipients with attachments",
      "Marking an email as top secret",
      "Sending high-priority urgent messages"
    ],
    correctAnswer: 0,
    explanation: "Bcc hides recipient email addresses from other recipients, essential when distributing mass student announcements or newsletters to prevent exposing contact lists.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    id: "comm-11",
    subject: "Communication Skills",
    topic: "Group Discussion Strategies",
    difficulty: "advanced",
    type: "scenario",
    question: "If a group discussion becomes chaotic with multiple candidates shouting over one another, how should you intervene?",
    options: [
      'Politely say: "Friends, we are digressing. Let us give each person 30 seconds so the panel can evaluate our points clearly."',
      "Shout louder than everyone else to gain control",
      "Walk out of the room",
      "Remain completely silent until the time buzzer sounds"
    ],
    correctAnswer: 0,
    explanation: "Moderating and de-escalating a chaotic discussion demonstrates natural leadership, emotional maturity, and organizational focus, earning high marks from evaluators.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    id: "comm-12",
    subject: "Communication Skills",
    topic: "Non-Verbal & Body Language",
    difficulty: "beginner",
    type: "conceptual",
    question: "What message does continuous fidgeting, slumping in the chair, or avoiding all eye contact communicate to an interviewer?",
    options: [
      "Nervousness, lack of confidence, or disinterest in the conversation",
      "Deep intellectual contemplation",
      "Casual technical expertise",
      "Polite submissiveness"
    ],
    correctAnswer: 0,
    explanation: "Non-verbal cues account for a major portion of first impressions. Slouching and nervous fidgeting signal unpreparedness, whereas calm posture conveys composure.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "comm-13",
    subject: "Communication Skills",
    topic: "STAR Method for Behavioral Interviews",
    difficulty: "beginner",
    type: "scenario",
    question: 'In the 60-second "Tell me about yourself" elevator pitch, what order of information is most compelling?',
    options: [
      "Current educational status -> Key technical skills & best project achievement -> Career goal alignment with the company",
      "Childhood hobbies -> Elementary school marks -> Personal life story",
      "Listing all programming languages alphabetically without project context",
      "Complaining about difficult college semester exams"
    ],
    correctAnswer: 0,
    explanation: "A strong pitch opens with current education and core identity, showcases 1-2 major technical project wins, and concludes with why you are enthusiastic about this specific opportunity.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    id: "comm-14",
    subject: "Communication Skills",
    topic: "Active Listening & Conflict Resolution",
    difficulty: "intermediate",
    type: "conceptual",
    question: "What is the purpose of taking a 3-second thoughtful pause before answering a complex technical question?",
    options: [
      "It allows you to organize your thoughts and prevents rushed, disorganized answers",
      "It shows you are stalling for time",
      "It forces the interviewer to repeat the question",
      "It indicates you do not know the answer"
    ],
    correctAnswer: 0,
    explanation: "A brief 3-5 second pause demonstrates deliberation, emotional control, and enables formulating a clear, structured response rather than blurting out disjointed thoughts.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    id: "comm-15",
    subject: "Communication Skills",
    topic: "Email & Professional Writing",
    difficulty: "advanced",
    type: "scenario",
    question: "Which of the following lines represents clear, professional assertion when requesting project feedback from a senior engineer?",
    options: [
      '"Could you review the PR by Thursday afternoon so we remain on track for sprint deployment? Please let me know if any changes are needed."',
      `"Why haven't you reviewed my code yet? It is urgent."`,
      '"Review my code whenever you feel like it, no rush."',
      '"Hey bro, check the PR asap."'
    ],
    correctAnswer: 0,
    explanation: 'Professional assertion includes a polite request, a specific deadline with business rationale ("remain on track for sprint"), and openness to feedback.',
    companyTags: ["Amazon", "Infosys"]
  },
  {
    id: "comm-16",
    subject: "Communication Skills",
    topic: "Group Discussion Strategies",
    difficulty: "intermediate",
    type: "conceptual",
    question: "In a campus GD, if you do not know much about the given technical topic at the beginning, what is the best strategy?",
    options: [
      "Listen keenly to the initial speakers, identify valid perspectives, and synthesize or add an analytical example once you grasp the context",
      "Fake facts and recite made-up statistics",
      "Remain completely quiet and refuse to participate",
      "Tell the moderator the topic is unfair"
    ],
    correctAnswer: 0,
    explanation: "Active listening allows you to quickly assimilate points made by peers, synthesize insights, and contribute a balanced perspective or practical application.",
    companyTags: ["TCS", "Wipro"]
  }
];
export {
  ALL_SUBJECTS,
  initialQuestionBank
};
