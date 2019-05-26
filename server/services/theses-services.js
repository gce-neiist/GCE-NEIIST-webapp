const natural = require("natural");
const path = require('path');
let htmlparser = require("htmlparser2");
const fileServices = require('./file-services');
let bClassifierThesis;
natural.PorterStemmer.attach();
const util = require('util');
const DBAccess = require('../mongodb/accesses/mongo-access');
const fs = require('fs');

const CLASSES = [
    "Algorithms and Applications",
    "Bioinformatics and Computational Biology",
    "Cyber-Security",
    "Software Engineering",
    "Data Science and Engineering",
    "It Service Management",
    "Interaction and Visualization",
    "Games",
    "Intelligent Robotics",
    "Cyberphysical Systems",
    "Information Systems",
    "Distributed Systems",
    "Enterprise Systems",
    "Intelligent Systems",
    "Language and Information Technologies"
];


const CLASSES_PT = [
    "Algoritmos e Aplicações",
    "Bioinformática e Biologia Computacional",
    "Ciber-Segurança",
    "Engenharia de Software",
    "Engenharia e Ciência de Dados",
    "Gestão de Serviços It",
    "Interação e Visualização",
    "Jogos",
    "Robótica Inteligente",
    "Sistemas Ciberfísicos",
    "Sistemas de Informação",
    "Sistemas Distribuídos",
    "Sistemas Empresariais",
    "Sistemas Inteligentes",
    "Tecnologias da Informação e Linguagem",
];

class ThesesServices {
    constructor() {
        this.trainClassifier = trainClassifier;
        this.saveClassifier = saveClassifier;
        this.parseTheses = parseTheses;
        this.saveParsedThesesOnFile = saveParsedTheses;
        this.classifyTheses = classifyTheses;
        this.saveClassifiedTheses = saveClassifiedTheses;
        this.loadClassifier = loadClassifier;
        this.loadClassifiedTheses = loadClassifiedTheses;
        this.classifyAux = classifyAux;
        this.saveClassifiedThesesOnDB = saveClassifiedThesesOnDB;
        this.thesisBackup = thesisBackup;
        this.getTheses = getTheses;
        this.classifyThesesArea = classifyThesesArea;
        this.saveClassifiedThesesOnDBAreaAndSpecialization = saveClassifiedThesesOnDBAreaAndSpecialization;
        this.getThesesBySpecialization = getThesesBySpecialization;
        this.getThesesByAdvisor = getThesesByAdvisor;
        this.getThesesByAreaAndAdvisor = getThesesByAreaAndAdvisor;
    }
}


let thesesServices = module.exports = exports = new ThesesServices();

/*
Network Services and Applications
Embedded Systems and Computer Architectures
Distributed Systems and Operating Systems

Interaction and Multimedia
Graphical Visualization

Artificial Intelligence Technologies
Intelligent Systems

Algorithms and Applications
Software Engineering
Programming

Architecture and Management of Information Systems
Information Systems Technologies

 */

async function getThesesBySpecialization(areas)   {
    return await DBAccess.thesis.getThesisRecomendation(areas);
}

async function getThesesByAdvisor(advisor)   {
    return await DBAccess.thesis.getThesisRecomendationByAdvisor(advisor);
}

async function getThesesByAreaAndAdvisor(area, advisor)   {
    return await DBAccess.thesis.getThesisRecomendationByAreaAndAdvisor(area, advisor);
}

async function trainClassifier (type) {
    //By discipline groups
    //https://fenix.tecnico.ulisboa.pt/departamentos/dei/disciplinas
    if (type === 1) {
        bClassifierThesis = new natural.BayesClassifier();
        ///////////////////////////////////////////////////////////
        ////////////// Scientific Area of Programming Methodology and Technology
        /////////////  Área Científica de Metodologia e Tecnologia da Programação
        ///////////////////////////////////////////////////////////

        //////////////Software Engineering////////////////////////

        //Software Architectures - ASof
        let objASof = "Teach quality software design methods, techniques, and languages using software architecture and domain-driven design for the development of large-scale software systems. Study the methods and techniques that bridge the gap between the problem space and the solution space, providing traceability from system requirements to system design. Read, analyse and design software architectures.".tokenizeAndStem();
        bClassifierThesis.addDocument(objASof, "Software Engineering");

        //Security Engineering
        let objSecurityEng = "To survey engineering techniques for developing secure systems. To understand the concepts, methods, and tools that can be applied within the different activities of the software development process, in order to improve the security of the resulting systems.".tokenizeAndStem();
        bClassifierThesis.addDocument(objSecurityEng, "Software Engineering");

        //Software Specification - QS
        let objQS = "To be acquainted with formal specifications and formal methods for software engineering, as well as tools/methods for automatic analysis of program properties. This course provides training in: 1. Design and modeling of software systems using a formal specification language. Automated verification of models and their properties. Declarative specification language for expressing constraints and behavior of software systems. States and traces. Static vs dynamic modelling. 2. Automated checking of programs (functional and imperative) against specifications. Verification of functional properties. Construction of verified programs, by annotating code with theorems, pre- and post-conditions, loop invariants, assertions, etc.".tokenizeAndStem();
        bClassifierThesis.addDocument(objQS, "Software Engineering");

        //Software Security
        let progSSoft = "Principles of Computer Security Basic properties and concepts; Software security design principles. •\tSoftware Vulnerabilities Conventional applications (buffer overflows, race conditions); Web applications and databases; Mobile application; Client-side security; •\tDevelopment of secure software Software auditing; Validation and encoding. •\tControl of execution environment Dynamic protection; Virtualization and security; Trusted computing. •\tLanguage Based Security Information flow analysis; Security type systems; Secure low-level code; Proof carrying code. •\tA Case Study: Java Security Sandboxing and stack inspection; Java security flaws; Java secure programming guidelines.".tokenizeAndStem();
        bClassifierThesis.addDocument(progSSoft, "Software Engineering");

        //Software Testing and Validation - TVS
        let objTVS = "As the size and complexity of software programs have grown, so has the importance of validation program correctness. A major cost in software development is its validation. There are several validation techniques. Software testing technique is one of the most widely used techniques. The Test and Validation Software (TVS) course provides advanced training in software testing, including semi-automatic and automatic manual techniques. This course also offers additional training on software validation techniques, including static analysis and model checking. It also provides contact with industrial and academic software validation tools.".tokenizeAndStem();
        let projTVS = "Motivation for Software Testing and Validation. White box testing based on code analysis: data flow and control flow analysis. Testing Object-oriented code: model-driven approach/black-box testing: boundary value testing, equivalence class testing, decision-table based testing, recursion testing, finite state machine testing; method scope testing, class scope testing Managing of the testing process: unit scope, subsystem scope, integration scope, system scope and regression scope Automated testing tools Non-Functional Testing: security, load, performance Static Analysis of Software. Automatic Generation of Testing: Mutation testing; Concolic testing; Symbolic execution; Model checking software. Additional Topics: delta debugging, code instrumentation; invariant identification.".tokenizeAndStem();
        bClassifierThesis.addDocument(objTVS, "Software Engineering");
        bClassifierThesis.addDocument(projTVS, "Software Engineering");

        ////////////////////////Programação

        //Advanced Programming - PAva
        let objPAva = "Understand advanced programming techniques and their domain of application. Understand programming language limitations and ways to overcome those limitations. Forecast the impact of the use of advanced programming techniques in the development, execution, and maintenance of software. Understand the reflective capabilities of programming languages regarding introspection and intercession at compile-time, load-time, and execution-time. Understand the differences between programming and meta-programming and the usefulness of code models. Understand meta-classes, meta-object protocols, and their intercession capabilities. Understand aspect-oriented programming and its application to cross-cutting requirements. Understand linguistic abstraction, evaluators, and meta-circular evaluators. Understand the implementation of meta-programming, lazy-evaluation and non-deterministic evaluation.".tokenizeAndStem();
        //let projPAva = "Reflection, introspection and intercession. Reification. Reflexive architectures. Meta-programming and code models. Reflection in Java and Javassist. Meta-object protocols. Protocols in CLOS. Generic functions and method combination. Classes and metaclasses. Protocols for making instances, for accessing instance members and for redefining classes. Aspect-oriented programming. AspectJ. Linguistic abstraction, evaluators and meta-circular evaluators. Macros. Lazy evaluation. Continuations. Direct and continuation-passing style. Non-local control transfer. Non-deterministic evaluation.";
        bClassifierThesis.addDocument(objPAva, "Programming");
        //bClassifierThesis.addDocument(projPAva,"Software Engineering");

        //Programming Languages - LPro
        //let objLPro = "Understand the history and evolution of programming languages and programming paradigms. Understand the concepts of binding, scope, extent, type, control flow, data abstraction, control abstraction, and exceptions. Evaluate the similarities and differences between programming languages. Understand the alternatives in programming language design and implementation, including compilation and interpretation, lexical and dynamic scope, static and dynamic typing, referenced-based and value-based memory models, manual and automatic memory management, etc. Understand different programming paradigms, including imperative, functional, logical and object-oriented.";
        let projLPro = "Programming language history. Compilation and interpretation, Binding, scope and extent. Lexical scope and dynamic scope. Modules. Memory allocation. Control flow, precedence and associativity. Assignment and initialization. Sequencing and selection. Iteration. Enumerated, logical, and combined cycles. External and internal iterators. Types. Type equivalence, type compatability, and type inference. Strongly vs weakly typed languages. Dynamic vs static typed languages. Type conversion. Recursive types. Pointers. Control abstraction. Subroutines. Parameter passing. Higher-order functions. Exceptions. Data abstraction and object-orientation. Dynamic binding. Reference-based vs value-based memory model. Single vs multiple inheritance. Generic programming. Functional programming history and theoretical foundations. Evaluation model. Logic programming history and theoretical foundations, resolution and unification. Scripting languages. Application domains. Case studies.";

        //bClassifierThesis.addDocument(objLPro,"Algorithms and Applications");
        bClassifierThesis.addDocument(projLPro, "Programming");

        ////////////////////////Algoritmos e Algoritmia =>  Algorithms and Applications

        ////Algorithms for Discrete Structures
        let obj = "1.	Advanced Data Structures i.	B-Trees ii.	Binomial Heaps iii.	Fibonacci Heaps 2.	Online Algorithms i.	Knut-Moris-Pratt ii.	Real-time String Matching iii.	Shift-And iv.	Match-count and FFT v.	Karp-Rabin Method 3.	Algorithms on Trees i.	Suffix Arrays ii.	Suffix Trees iii. Longest Common Substring iv.	Maximal Repetitive Structures v.	Circular String Linearization vi.	Amortized Analysis vii.	Ukkonen?s Linear-time Suffix Tree Algorithm 4.	Algorithms on Graphs i.	Simple Pattern Matching ii.	Distances in Graphs iii.	Finding Trees in Graphs iv.	Finding Sub-graphs 5.	Applications i.	Computational Biology ii.	Information Retrieval".tokenizeAndStem();
        //bClassifierThesis.addDocument(objLPro,"Algorithms and Applications");
        bClassifierThesis.addDocument(obj, "Algorithms and Applications");

        //Bioinformatics  - Bioi
        //let objBioi = "Bioinformatics aims at developing computational methods and algorithms to process biological data and uses mathematical and statistical modelling to generate testable hypotheses about biological entities and processes. The goal of this course is to introduce the basic techniques that support the most recent developments on this field. Additionally, it enables the development of the ability to critically assess research publications in this field. Practical assignments during the course aim at developing the student\'s ability to develop software for bioinformatics.";
        let projBioi = "Introduction, Molecular biology main concepts, Introduction to algorithms and complexity Graphs and genetics DNA sequence analysis Pairwise alignment Multiple Sequence alignment Motif finding NGS data, algorithms and data structures Probabilistic models Gene expression data analysis Data mining Unsupervised Learning: Clustering and Biclustering Molecular phylogenetics Supervised Learning: Decision trees, Bayesian methods Integrative data analysis Seminar";

        //bClassifierThesis.addDocument(objBioi,"Bioinformatics and Computational Biology");
        bClassifierThesis.addDocument(projBioi, "Algorithms and Applications");

        //Parallel and Distributed Computing - CPD
        //let objCPDDS = "Understanding the models, techniques, and programming methods for parallel algorithms. Analyzing and designing parallel algorithms. Understanding the foundations of distributed computing.";
        let projCPDDS = "Parallel computing models: multiprocessors and multicomputers. Memory organization; communication complexity. Interconnection networks. Flynn’s taxonomy. Programming message-passing systems: MPI. Programming shared memory systems: OpenMP, threads, race conditions, deadlock detection. Analysis and synthesis of parallel algorithms: problem partitioning; data organization; synchronization; balancing and scheduling. Performance analysis for parallel algorithms. Foundations of distributed computing and their applications to parallel algorithms. Limits of parallel computing. Analysis of parallel algorithms: sorting algorithms; numerical algorithms, matrix multiplication, solving systems of linear equations; algorithms on graphs; search and optimization algorithms.";

        //bClassifierThesis.addDocument(objCPDDS,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projCPDDS, "Algorithms and Applications");

        //Advanced Algorithms - AAva
        //let objAAva = "Data structures and algorithms are the basic building blocks of any computer system and they become even more relevant when such systems have to process huge volumes of data and/or have to meet real time processing requirements. The aim of this course is to provide advanced training in techniques for the development and implementation of efficient algorithms and applications, with particular focus on advanced data structures and algorithms for indexing and compression, and on randomization, sampling and approximation schemes, taking into account real time processing requirements and distributed computing environments. This course will follow a problem based learning approach where techniques and methods will be intuitively and constructively explored.";
        let projAAva = "Advanced data structures. B-trees. Binomial heaps, Fibonacci heaps, and relaxad heaps. Approximation algorithms for NP-hard problems. Probabilistic techniques, random algorithms and game theory. Algorithms with random choices. Online and real-time algorithms. Parallel algorithms and algorithms using external memory. Approximation algorithms for polynomial problems, e.g., linear algorithms for MSTs. Fast algorithms for minimum cuts. Graph partitioning. Approximated counting. String algorithms and pattern matching. Suffix trees and suffix arrays. Tree algorithms, LCA. Amortized Analysis.";

        //bClassifierThesis.addDocument(objAAva,"Algorithms and Applications");
        bClassifierThesis.addDocument(projAAva, "Algorithms and Applications");

        //Algorithms for Computational Logic
        //let objAAva = "Data structures and algorithms are the basic building blocks of any computer system and they become even more relevant when such systems have to process huge volumes of data and/or have to meet real time processing requirements. The aim of this course is to provide advanced training in techniques for the development and implementation of efficient algorithms and applications, with particular focus on advanced data structures and algorithms for indexing and compression, and on randomization, sampling and approximation schemes, taking into account real time processing requirements and distributed computing environments. This course will follow a problem based learning approach where techniques and methods will be intuitively and constructively explored.";
        let objACL = "Decision problems in propositional logic (Boolean Satisfiability, SAT).Examples of modelling using propositional logic. Algorithms for SAT. Decision problems in first-order logic. The Satisfiability Modulo Theories (SMT) problem. Problem encodings for SAT. Algorithms for SMT. Constraint Programming (CP): algorithms and modeling examples. Encodings for propositional logic. Answer Set Programming (ASP): algorithms and modeling examples. Relationship with propositional logic. Function and enumeration problems for SAT, SMT, ASP and CP: including optimization problems and over specified sets of constraints. Decision, function and enumeration problems with quantified propositional variables. Application examples.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAAva,"Algorithms and Applications");
        bClassifierThesis.addDocument(objACL, "Algorithms and Applications");

        //Computational Biology
        let objCB = "Introduction, Molecular biology main concepts, Introduction to algorithms and complexity Graphs and genetics DNA sequence analysis Pairwise alignment\tMultiple Sequence alignment Motif finding NGS data, algorithms and data structures Probabilistic models Gene expression data analysis Data mining Unsupervised Learning: Clustering and Biclustering Molecular phylogenetics Supervised Learning: Decision trees, Bayesian methods Integrative data analysis".tokenizeAndStem();
        bClassifierThesis.addDocument(objACL, "Algorithms and Applications");

        //Network Science
        let objNS = "Properties and characterization of biological, social and technological networks. Network models and random graphs. Efficient representation of large (sparse) networks. Succinct data-structures and coding strategies. Design and analysis of efficient and scalable algorithms for large network processing and analysis, including both sampling and randomization techniques. Databases and distributed platforms for the analysis of large networks. Link analysis and random walks. Community finding and graph partitioning. Ranking algorithms. Vertex relabeling. Dynamical processes on complex networks: The impact of network structure on economic, social and biological systems. Introduction to stochastic processes, Monte-Carlo simulations and large-scale multi-agent systems. Disease spreading and tolerance to attacks. Models of peer-influence and opinion formation. Game theory and population dynamics. Public goods problems, cooperation and reputation dynamics. Decision-making on (static and adaptive) interaction networks.".tokenizeAndStem();
        bClassifierThesis.addDocument(objNS, "Algorithms and Applications");

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////
        ////////////// Scientific Area of Architecture and Operating Systems
        ////////////// Área Científica de Arquitectura e Sistemas Operativos
        ///////////////////////////////////////////////////////////

        ///////////// Aplicações e Serviços em Redes - Network Services and Applications

        //Ambient Intelligence - AI
        //let objAI = "•\tunderstand the concept of Ambient Intelligence and be aware of the multiple fields where it can be applied; •\trecognize the importance of having sensitive and responsive environments that react accordingly to the presence and preferences of people; •\tbe introduced to different technologies that are applied in this field and be aware of the main challenges regarding power consumption, communication, security, reliability, interface with sensors and actuators and interface with people. •\tlearn about three specific application areas: smart homes/home automation and intelligent buildings, wireless sensor and actuator networks, and intelligent mobility systems; •\tbe aware of different energy management policies, in the field of home/building automation, keeping focus on the user requirements and preferences; •\tbe able to understand, define the requirements and address the implementation of a system that monitors an environment and reacts to different events and to the profile of the people present.";
        let projAI = "Ambient Intelligence. From current smart environments to future ambient intelligence: smart cities, health and assisted life, smart dust. Architecture and technologies to support ambient intelligence: sensors, actuators, embedded computing. 2.	Detection, classification, and identification general requirements for intelligent environments. Main detection technologies for humans and objects: tagging, radio-frequency (RF/ID), image processing. Location systems. 3.	Intelligent buildings and homes. Requirements: comfort, energy management, security. Environment sensing and control. a.	Legacy automation platforms: X10, KNX, LonWorks. IP based platforms: Building Automation and Control Network (BACnet), Open Building Information Exchange (oBIX). Integrated platforms: Apple iHome. b.	Facility management: environment, energy, safety, and security. Smart Grid. 4.	Smart Cities and Mobility: characteristics of urban environments – services, mobility/accessibility, environment, energy. a.	Intelligent mobility systems: Public transport modes, identification and ticketing requirements, types of services (regular vs flexible / on demand). b.	Intelligent transportation systems (ITS): Legacy platforms – detection, classification and identification of vehicles, traffic management. c.	Mobility patterns: data capture and collection (explicit, implicit, crowd-sourced). d.	On-board computational systems: architecture, functional segmentation (driving, safety, comfort); automotive buses. Integration of applications (EBSF). e.	Autonomous and connected vehicles: vehicle to vehicle and to insfrastructure interactions (V2V, V2I); vehicular communications, data models for interoperation (SAE J2735). 5.	Industry and Logistics: Characteristics of the production and supply chain. Reactive and reconfigurable production (Industry 4.0). 6. Supply chain management a.	Product and container identification – bar codes and electronic tags; global Electronic Product Code architecture. b.	Supply chain facilities: intelligent warehouses, smart shops, transportation fleets. c.	Internet of Things (IoT). 7.	Assisted Life: Biosensors and wearables; smart clothing and textiles. Vital signs monitoring and life support. Remote monitoriring of risk groups (security, elderly and disabled). 8.	Other application domains: structural monitoring, intelligent materials; natural environment, smart farming.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAI,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projAI, "Network Services and Applications");

        //AInfra-Structures and Network Management
        let projISNM = "Networks evolution, systems and services; Management Scenarios Management frameworks Functional Areas Framework; Responsibility Framework; Life Cycle Framework Management Standards Concept of Management Architecture; Internet Management Architecture; DMTF Management Architecture; Web based Management; Active Policy based Management Management Tools Performance Monitoring; Equipment and Services Configuration; Management Platforms; Problem solving Management Systems and Other tools Management Processes Services Structuring; Service Level contracts; Business Process Framework for the Information and Communications Services Industry (eTOM)".tokenizeAndStem();
        bClassifierThesis.addDocument(projISNM, "Network Services and Applications");

        //Computer Networks Planning and Management
        let projCNPM = "Computer networks and the Internet; Internet Protocol Architecture; Computer networks structure. Network technologies: Wired Local Networks: Ethernet and Token-ring. Wireless Local Networks: WiFi and Bluetooth. Wide Area Networks: ATM and Frame-Relay. Access Networks: ADSL, HFC, UMTS e WiMAX. Network management: SNMP management: information model and communication model. Network performance monitoring. Equipment and services configuration. Computer network planning and project: Rules Planning stages Project Services hiring".tokenizeAndStem();
        bClassifierThesis.addDocument(projCNPM, "Network Services and Applications");

        //Security in Networks and Systems
        let projSNS = "Security architecture of an organisation. Security policies. Network vulnerability. System vulnerability. Code design and certification. Periphery control systems. Application of cryptographic mechanisms. Key distribution. Authentication protocols. Secure communications protocols. Authorisation models. Practical applications: analysis of wireless networks protocols (GSM, UMTS, WiFi, Bluetooth); analysis of VPNs (IPSec, TLS, PPTP, OpenVPN); analysis of information systems.".tokenizeAndStem();
        bClassifierThesis.addDocument(projSNS, "Network Services and Applications");

        //////////// Arquitectura de Computadores e Sistemas Embebidos => Embedded Systems and Computer Architectures

        ////Applications and Computation for the Internet of Things
        //let objIOT = "Students should be able to design, develop, integrate and test cyber-physical systems for the Internet of Things (IoT) with a focus on the requirements and restrictions of cyber-physical interfacing and related software. To study the control and evaluation of cyber-physical interfaces, system-software architectures, and common design patterns; design and performance evaluation of constrained systems (power, memory). Relevant case studies: widespread technologies (identification based on smart cards and tags and biometrics); widespread devices (sensors in smartphones).";
        let progIIOT = "Characteristics of cyber-physical systems in the IoT: requirements, life cycle, economy. 2.\tInput/Output interface and devices. Modes of service. Interfacing the physical world – cyber-physical interfaces (logical interaction with sensors and actuators). Performance evaluation (latency, bandwidth, precision, resolution). 3.\tSystem-software architectures – Run-time platforms: Round robin, function-queue scheduling, multitasking; preemption, scheduling (RMS, EDF). Performance evaluation: workload, latency, reliability. 4.\tSoftware design patterns. Non-functional requirements: execution time, energy management, memory usage. 5.\tReal-time systems. 6.\tFault tolerance. 7.\tDesign and development of embedded systems. System specification. Development and life cycles. 8. Case studies: widespread technologies – electronic identification (smart cards and tags) and biometrics; widespread devices (sensors in smartphones). 9.\tAdvanced topics: Co-design, sensor networks. 10.\tSeminar.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objIOT,"Embedded Systems and Computer Architectures");
        bClassifierThesis.addDocument(progIIOT, "Embedded Systems and Computer Architectures");

        ////Architectures for Embedded Computing
        let progAEC = "embedded systems, impact in the architecture design. Review of basic concepts in microprocessor-based digital systems: ISA, datapath, control, memory, I/O. Introduction to ILP: pipeline, superscalar and VLIW processing. Definition of ISA for VLIW processors and their architecture: datapath, registers, memory, speculation, energy consumption. Input/output system: typical devices, A/D-D/A converters, standard buses. Core processors and systems-on-chip. Compilation and code generation for ILP. Exceptions, interruptions and traps. Code compression. Performance analysis and tuning. Operating systems: multi-tasking and multi-threading.".tokenizeAndStem();
        bClassifierThesis.addDocument(progAEC, "Embedded Systems and Computer Architectures");

        ////Devices and Networks for Logistics
        let progDNL = "Introduction Characteristics of IT infrastructures to support operations management and logistics: Requirements, life cycle, economical factors, geographical coverage, response time. Object identification: Electronic Product Code. Electronic identification (R/F ID). Object location: Global positioning, cells Mobile and wireless communication networks. Services on mobile networks. Quality of service. Architecture of information systems for mobile teams. Integration with ERPs. Case study: Fleet management. Case study: Distribution and retail. Advanced topics: Sensor networks and smart materials. Presentation of student Works.".tokenizeAndStem();
        bClassifierThesis.addDocument(progDNL, "Embedded Systems and Computer Architectures");

        ////// Sistemas Operativos e Sistemas Distribuídos => Distributed Systems and Operating Systems

        ////Management and Administration of It Infrastructures and Services
        let progAGI = "1.\tIntroduction and Background a.\tEvolution of IT infrastructure and services; b.\tIT resources (storage, servers, network) and IT services; c.\tIT lifecycle: design, configuration, deployment, administration, and management. 2.\tIT Infrastructures and Facilities a. Physical infrastructures and premises: Datacenter design, dimensioning and planning; Energy: energy management and green computing; b.\tNetworking: data center networks; network topologies; network setup and emulation (Mininet); c.\tStorage: storage architectures and technologies; SAN, NAS, DAS; storage network protocols, distributed storage synchronization and lifecycle management; d.\tDatacenter Resiliency: availability, performance, security. 3.\tIT Service Platforms a.\tConventional datacenter architecture, entities and functions (firewall, DMZ, DNS, IDS, web cache, directory services, etc.); b.\tCloud computing infrastructures: SaaS, PaaS, IaaS; c.\tIT virtualization: virtual servers, virtual disks, unikernels, containers (Docker), Docker Compose; d.\tNetwork Function Virtualization (Openflow); Network and traffic flow analysis; Virtualized network functions (VNF) and services; e.\tSoftware-defined datacenter; Software-defined networks (Floodlight). 4.\tDevelopment, deployment and configuration a.\tDevOps (Development integrated with Operations): Continuous integration; Continuous delivery; Continuous deployment; b.\tApplications Models: Microservices and monoliths; Serverless computing; c.\tDevOps toolchain: i.\tversion control, bug tracking, build, testing; ii.\tprovisioning and deployment; Programmatic configuration (Infrastructure-as-code), tools, models, case-studies (Vagrant, Ansible, Puppet, Chef, OpenStack); d.\tService provisioning and container orchestration (Docker Swarm, Kubernettes, Mesos). 5.\tIT Administration a. Administration, backup, automation, administration domains; b.\tDistributed monitoring (Ganglia, Cacti, etc.); Network and service analytics. 6.\tIT Management Issues a.\tManagement and governance standards; Management best practices (ITIL); IT service management; Billing, charging and settlements; b.\tContinuity management; Availability and capacity management; Service Assurance and Quality Management.".tokenizeAndStem();
        bClassifierThesis.addDocument(progAGI, "Distributed Systems and Operating Systems");

        ////Applications and Implementation of Security Systems
        let progAISS = "Cryptographic Implementations History of Cryptography Implementation of Cryptographic Algorithms Cryptographic Services Public Key Cryptography Standards Java API Security Devices Smartcards JavaCards Trusted Platform Module Biometric Systems Human Factor in Security Communication Skills Ethics Social Engineering Cryptographic Attacks Cryptanalysis Side Channel Analysis API Attacks Physical Protection Physical Protection Reliable Physical Security".tokenizeAndStem();
        bClassifierThesis.addDocument(progAISS, "Distributed Systems and Operating Systems");

        ////Data Centers
        let p1 = "Advanced computer architecture (hyperpipelining, hyperthreading, multicore, chipset architecture) Server architecture (data centers Arquitectura de servidores (data centers, multitier model, shared memory and caches, distributed memory, interconnections) Mass memory systems (RAIDS, SANs) Conception, planning and design of data centers Network impact on servers System implementation (blades, UPS, HVAC) Performance assessment (tradeoffs, analysis models, benchmarks) Virtualization (virtual servers, virtual mass memory, virtual data centers) and load-balancing Consolidation and support to application and data migration Availability, reliability and disaster recovery Specific security measures and implementation (redundant firewalls) Server management (administration, maintenance, monitoring, quality of service, BSM support) Introduction to best practices and regulamentation (ITIL, ISO 17799) Outsourcing".tokenizeAndStem();
        bClassifierThesis.addDocument(p1, "Distributed Systems and Operating Systems");

        ////Forensics Cybersecurity
        let p2 = "Fundamentals of forensic analysis, methodology, data types. Forensic analysis of networks, network data analysis, analysis of asset management systems. Forensic analysis of systems, Windows and Linux systems, mobile systems.".tokenizeAndStem();
        bClassifierThesis.addDocument(p2, "Distributed Systems and Operating Systems");

        ////Cloud Computing and Virtualization
        let p3 = "Introduction to Virtualization and Cloud Computing, Infrastructure-as-a-Service, Platform-as-a-Service, Software-as-a-Service. System-level virtualization: system VM architecture, CPU virtualization, OS core, memory, I/O; hardware support for virtualization, case studies (VMWare, QEMU/KVM, Xen). Cloud computing systems (Amazon EC2, OpenStack, XenCloud, OpenNebula); VM scheduling, migration and replication; monitoring and scalability (CloudWatch, Autoscaling). Process-level virtualization: Java VM specification and reference implementation, security model, code management and binary translation, just-in-time compilation and optimization, garbage collection, case studies (Jikes RVM). Cloud computing platforms (Azure, Google App Engine); distributed virtual machines; monitoring and scalability (Azure Fabric Controller). Data and Storage services: block storage, file storage, key-value stores (Dynamo, S3, Datastore), tabular storage (BigTable, Percolator). Cloud computing scalability: Map-reduce, dataflows (Pig, Dryad, OOzie), streams (S4), applications, monitoring, elasticity and optimization. Cloud computing cross-cutting concerns: virtualization energy efficiency, dynamic provisioning, energy centered cloud design.".tokenizeAndStem();
        bClassifierThesis.addDocument(p3, "Distributed Systems and Operating Systems");

        //Mobile and Ubiquitous Computing - CMov
        //let objCMov = "Understand the fundamental challenges and problems underlying the design and development of software (middleware and operating system) supporting applications for mobile and ubiquitous scenarios (users, hardware, software). Design, specify, analyse and implement software systems (mobile/ubiquitous middleware and operating system) that can support mobile/ubiquitous applications.";
        let projCMov = "Introduction. Fundamental challenges and problems of mobile and ubiquitous computing. Replication (caching, staging, hoarding), consistency and synchronization. Resource discovery and usage (cyberforaging). Mobility, location, context-awareness and adaptability. Battery consumption. Security. Communication, ad-hoc and sensor networks. Mobile code, mobile agents. Middleware and examples of applications, architecture of applications (Android).".tokenizeAndStem();
        bClassifierThesis.addDocument(projCMov, "Distributed Systems and Operating Systems");

        ////Advanced Mobile and Ubiquitous Computing
        let p4 = " mobile and ubiquitous computing, context-awareness, communication, adaptability, cyberforaging, replication, consistency and synchronization, battery consumption, security, and design methodologies and infrastructure".tokenizeAndStem();
        bClassifierThesis.addDocument(p4, "Distributed Systems and Operating Systems");

        //Design and Implementation of Distributed Applications
        //let objPADIDS = "Understand the system level problems underlying the design and development of large-scale applications. Learn the existing solutions concerning the middleware for large-scale applications with emphasis on the models and architectures taking into account non-functional requirements (scalability, performance, etc.). Specify, design, analyse and implement large scale distributed applications as well as its underlying middleware.";
        let projPADIDS = "Part I: System Models System models Synchronous vs asynchronous systems. Message passing vs shared memory. Fault-models. Consistency models and the CAP theorem. System scales: Client server Clusters and Grid Computing Cloud Computing Peer to peer Part II: Abstractions Distributed Coordination: Physical clocks and clock synchronization Logical time and logical clocks Vector clocks Global states and distributed snapshots Mutual exclusion Leader election Distributed agreement Reliable multicast Total order Consensus Group communication and virtual synchrony Distributed transaction processing Concurrency control Distributed atomic commitment Part III: Systems Building large reliable systems Replicated File-systems Lazy replication Peer-to-peer systems. Geo-replicated systems The google case-study".tokenizeAndStem();
        //bClassifierThesis.addDocument(objPADIDS,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projPADIDS, "Distributed Systems and Operating Systems");

        //Engineering of Large Scale Systems
        //let DDRS = "Performance and scalability are key factors to the success of Internet services such as those provided by Google, Amazon, Microsoft, Facebook or Netflix. The goal of this course is to equip students with the ability to reason about performance and scalability in large scale systems in general, and in cloud-based systems in particular. Students will learn to identify scalability limitations and system bottlenecks, by monitoring and modelling system behaviour. Students will also learn how to properly design benchmarks and simulations and how to interpret results through appropriate data representation. Equipped with these skills, students will be able to design scalable systems with good performance running in cloud platforms and enhance existing systems. Students will exercise these skills through concrete cases studies that will exploit Machine Learning, resource heterogeneity, and other techniques to predict future behaviour, perform capacity planning, and develop self-adapting systems. By the end of the course, students should be able to: ● Engineer systems for performance and scalability ●\tDesign benchmarks to correctly assess system behaviour under different workloads ●\tMeasure, identify and address system bottlenecks ●\tPredict future system behaviour for capacity planning ●\tSimulate new systems to assess their behaviour before implementation and simulate existing systems to assess impact of potential changes.";
        let DDRSA = "1 - Introduction (2 classes) - Introduction, challenges and common mistakes - Overview of a cloud-based system - Performance and scalability challenges in NoSQL Cloud data stores - Performance and scalability challenges in Network Virtual Functions (NVF) 2- System Scalability (2 classes) - Fundamental Concepts of Scaling: Scalability, Efficiency and Elasticity - Aspects limiting system scalability: - Contention: relation and impact of Amdahl's Law - Coherence: relation and impact of Universal Scalability Model 3 - System Performance (5 classes) - System properties, throughput, latency, jitter, useful work - Concurrency, queueing and overload - Bottleneck identification - Design for performance: batching, queueing, dallying, speculation, scheduling 4 - Simulation (3 classes) - Discrete event simulation - Event set structures - Simulation verification and validation - Replications and stop conditions 5 - Benchmarking and capacity planning (5 classes) - Benchmarking, macro and micro benchmarking - Workload selection and design - Metrics and metrics representation - Scalability parameters - Evaluation factors and techniques - Capacity planning 6- Self-Adapting systems (4 classes) -\tProperties of self-adapting systems -\tAutonomic operation and reconfiguration -\tRole of Machine Learning in modern self-adapting systems -\tAutomated configuration discovery -\tAdaptation policies 7 - Case studies (2 classes) - Exploiting heterogeneity for improving NoSQL database performance - Performance prediction using Machine Learning - Capacity planning and self-adapting systems";
        //bClassifierThesis.addDocument(DDRS,"Enterprise and Information Systems");
        bClassifierThesis.addDocument(DDRSA, "Distributed Systems and Operating Systems");

        ////Network and System Administration and Management
        let p5 = "- Introduction - ITIL V3 background and drivers for the ITIL refresh. - Service Management as a practice. - Service and Service Management concepts. - Definition and distinction of the Function, Role and Process concepts. - Process Model - Process characteristics. - Service lifecycle - Service lifecycle concept. - ITIL structure, scope, components and interfaces. - Main goals and objectives of Service Strategy. - Main goals, objectives and value to business of Service Design, Service Transition, Service Operations and Continual Service Improvement. - Phases in the service lifecycle - Service Strategy, Service Design, Service Transition, Service Operations e Continual Service Improvement - Understanding and description of Service Management key principles and models. - Understanding of the Service Management processes and their contribution to the Service Lifecycle. - Explaining the high level objectives, scope, basic concepts, KPIs, roles and challenges of the core processes. - Introduction to the basic concepts and roles relating to the non-core processes. - Functions - Service Desk function. - Concepts and relationship between the functions: Technical Management, Application Management, IT Operations Management - Organization and Roles - Understanding of the key roles in Service Management and recognition of the other roles. - RACI Model. - Technology and Architecture - Definition of the generic requirements for Service Management technology. - Understanding of the role of automation in assisting Service Management processes. - ITIL qualification scheme - Explain the ITIL V3 qualification scheme. - Differences to V2 qualification scheme and transition path. - Main differences to previous ITIL versions. - Certification of the Service Management systems in IT organizations (ISO/IEC 20000) - Introduction to ISO/IEC 20000 - ISO 20000 certification and the certification process. - Quality Management System. - Planning to achieve ISO 20000 certification. - Retaining the certification.".tokenizeAndStem();
        bClassifierThesis.addDocument(p5, "Distributed Systems and Operating Systems");

        //Network and Computer Security - SIRS
        //let objSIRS = "The main goal of this curse is to provide the students with the basic set of concepts, methodologies and tool on computer and network security. This will make them comfortable with the broad set of technologies such as: local and global networks, personal and private networks, development of secure code, operating systems, distributed systems, and communications protocols.";
        let projSIRS = "tNetwork security and vulnerabilities •\tFirewalls and intrusion detection systems •\tDevelopment of secure code • Certification •\tSymmetrical and asymmetrical encryption and cryptographic hash functions •\tMessage authentication and digital signatures •\tDistribution protocols and management of symmetrical keys •\tDigital certificates and public key distribution infrastructures •\tAuthentications and authentication protocols •\tAuthorization •\tWireless networks security •\tVirtual private networks and secure channels".tokenizeAndStem();
        //bClassifierThesis.addDocument(objSIRS,"Cyber-Security");
        bClassifierThesis.addDocument(projSIRS, "Distributed Systems and Operating Systems");

        //Highly Dependable Systems - SDTF
        //let objSDTFC = "To provide an integrated perspective of dependable computing, addressing the mechanisms required to tolerate different types of faults, from accidental to malicious faults, including intrusions. The course addresses the security and fault-tolerant aspects of the system design.";
        let projSDTFC = "1) Dependability fundamentals a) Taxonomy (fault, error, failure) b) Reliability, availability, maintainability, safety, security c) Fault assumption and coverage d) Space, Time, and Value redundancy. Coding. Triple Modular Redundancy e) Error processing. Backward and forward recovery. f) Failure detection and system diagnosis. Watchdogs 2) Secure Hardware a) Security devices b) Smartcards c) Trusted Platform Module d) Biometric Systems 3) Securing the system a) Physical security b) Physical protection of systems c) Intrusion tolerance 4) Byzantine fault tolerance a) Byzantine Leader Election b) Byzantine Broadcast c) Byzantine Memory d) Byzantine Consensus e) Byzantine Replicated State Machines 5) Human Factors a) Human factors in security b) Social engineering".tokenizeAndStem();
        //bClassifierThesis.addDocument(objSDTFC,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projSDTFC, "Distributed Systems and Operating Systems");

        //Cloud Computing and Virtualization - AVExe
        //let objAVExe = "Attain an integrated perspective of cloud computing and virtualization, with combined approaches for the design of modern large scale and distributed computing systems, and with their underlying mechanisms and algorithms. Understand a vertical approach to the various virtualization and cloud computing technologies, enhancing applications and services with improved flexibility, resource and economic efficiency, scalability and adaptability. To be able to develop reliable and scalable systems and applications, on cloud computing over current virtualization platforms and applications models. To be able to assess and evaluate solutions, given the alternatives and tradeoffs involved in the employment and management of virtualization infrastructure for cloud computing.";
        let projAVExe = "Introduction to Virtualization and Cloud Computing, Infrastructure-as-a-Service, Platform-as-a-Service, Software-as-a-Service. System-level virtualization: system VM architecture, CPU virtualization, OS core, memory, I/O; hardware support for virtualization, case studies (VMWare, QEMU/KVM, Xen). Cloud computing systems (Amazon EC2, OpenStack, XenCloud, OpenNebula); VM scheduling, migration and replication; monitoring and scalability (CloudWatch, Autoscaling). Process-level virtualization: Java VM specification and reference implementation, security model, code management and binary translation, just-in-time compilation and optimization, garbage collection, case studies (Jikes RVM). Cloud computing platforms (Azure, Google App Engine); distributed virtual machines; monitoring and scalability (Azure Fabric Controller). Data and Storage services: block storage, file storage, key-value stores (Dynamo, S3, Datastore), tabular storage (BigTable, Percolator). Cloud computing scalability: Map-reduce, dataflows (Pig, Dryad, OOzie), streams (S4), applications, monitoring, elasticity and optimization. Cloud computing cross-cutting concerns: virtualization energy efficiency, dynamic provisioning, energy centered cloud design.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAVExe,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projAVExe, "Distributed Systems and Operating Systems");

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////
        /////////// Scientific Area of Information Systems
        //////////  Área Científica de Sistemas de Informação
        ///////////////////////////////////////////////////////////

        ///// Arquitectura e Gestão de Sistemas de Informação - Architecture and Management of Information Systems

        //Information Systems Project Management - GPI
        let objGPIES = "The objectives of GPI are aligned with the same objectives as defined for the course “IS 2010.4 IS Project Management” of the curriculum “ACM/AIS IS 2010 Curriculum Guidelines”, namely: 1. Understand the concepts of project and project management in the organizational context 2. Understand the project management process groups 3. Understand and properly relate the project management processes with the different projects development lifecycles approaches 4. Make use of project scope planning methods and techniques 5. Make use of project scheduling methods and techniques 6. Identify the project stakeholders, make use of project organization and responsibilities planning methods and techniques and develop the project communication planning 7. Identify the main cost components and be capable to use cost planning methods and techniques to define the project budget 8. Make use of quality planning, quality assurance and quality control in the project management context 9. Make use of risk identification, assessment, treatment and control methods and techniques 10. Understand the procurement management processes and the management of different project contract types 11. Make use of information and tools to support project control, project close and suitable metrics 12. Identify the main Project Manager technical, behavioral and contextual competence elements 13. Understand the concepts of project based organization, change management, project value, programme management, portfolio management and governance of projects. 14. Make adequate use of MS-Project functionalities on practice exercises".tokenizeAndStem();
        let projGPIES = "The syllabus of GPI is closely aligned with the course \"IS 2010.4 IS Project Management\" defined in the \"ACM / AIS IS 2010 Curriculum Guidelines\" having the following main topics: 1. Project management related concepts in an organizational perspective 2. Project basics 3. Life Cycles models 4. Scope management 5. Time management 6. Project Organization and Communication management 7. Stakeholders management 8. Cost management 9. Quality management 10. Risk management 11. Procurement management 12. Project control 13. Project closure 14. Project Management competence elements 15. Projects alignment with the Organization and the Business.".tokenizeAndStem();

        bClassifierThesis.addDocument(objGPIES, "Architecture and Management of Information Systems");
        bClassifierThesis.addDocument(projGPIES, "Architecture and Management of Information Systems");

        //Enterprise Architecture - APFSI
        let objAPFSI = "1. Understand the lifecycle of enterprise engineering, including governance and processes of organizational transformation. 2. Understanding the fundamental theories underlying business engineering. 3. Understand and apply the principles of enterprise architecture. 4. Understand and use the modeling languages for enterprise architecture, especially the ArchiMate and DEMO. 5. Understanding and using models and frames of reference of organizations by industry. 6. Understand and apply the techniques of business alignment 7. Analyze case studies of real organizations";
        let projAPFSI = "1. Organizational design • organizational ontology • datalogic , infologico and ontological design . • DEMO method • DEMO language 2. Languages modeling Enterprise Architecture • overview of the ratings of Enterprise Architecture : BPMN , REA , EPC , IDEF , YAWL , UML ; • extensions of the basic model and ArchiMate . 3. Enterprise Architectural Frameworks • overview of the enterprise architecture frameworks : 2.0 FEAF , DoDAF , PEAF , IAF , BEN / St . Galen , COBIT , ITIL , IEEE 42010 , Zachman , TOGAF . 4 . Perspectives of Enterprise Architecture • views , views , and view models . • perspective of business and motivational • informational perspective • systemic perspective • infrastructural perspective 5 . Reference Models for Enterprise Architecture • Requirements of a property s Enterprise Architecture Reference Model ; • Examples of Reference Models : Telecommunications , Retail , Financial , ( TAM , eTOM , SID , PCF , SCOR ) 6 . Principles of Enterprise Architecture • standards and principles of enterprise architecture • actual examples 7 . Business representation • representation techniques • automation of business representation 8 . Methods for Enterprise Architecture • \" Business Systems Planning\" • \" Information Systems Architecture \" 9. Alignment of Enterprise Architecture • concepts and types of alignments • benchmarking and measuring alignments 10 . Concepts and Modelling of Information Architecture • informational entities • languages and techniques of information architecture 11 . Concepts of System Architecture • concepts of information systems • systems architecture in ArchiMate 12 . Service Architecture • service-oriented architecture • modeling services • methods for identifying service 13. Concepts of Technology Infrastructure • modeling infrastructure , products and technology modeling capabilities".tokenizeAndStem();

        bClassifierThesis.addDocument(objAPFSI, "Architecture and Management of Information Systems");
        bClassifierThesis.addDocument(projAPFSI, "Architecture and Management of Information Systems");

        //Foundations of Information Systems - AOSI
        //let objAOSI = "The learning objectives of Foundations of Information Systems are the subject of \"IS 2010.1 Foundations of Information Systems\" curriculum \"ACM / AIS IS 2010 Curriculum Guidelines\": 1.\tProvide a socio-technical approach to organizational information systems; understand how and why information systems are used in organizations today 2.\tExplain the relationships between the components of technology, people and organization of business information systems 3.\tKnow the main technology components of information systems 4.\tUnderstanding how businesses use information systems to support their activities and create competitive advantages 5. Understanding how information systems enable new forms of trade between individuals, organizations and governments 6.\tMeet new technologies that enable new forms of communication, collaboration and partnerships 7.\tUnderstanding how information systems enable relationships with customers and suppliers, and how they are used to strengthen the organizational structures and business processes 8.\tUnderstand how information systems can support decision making at different levels and functions of organizations 9. Understand how organizations develop and acquire technology and information systems 10.\tUnderstanding the value of investments in information systems, as well as learn how to prepare a business plan for a new information system, including estimated costs and benefits 11.\tMitigate risks, and plan and recover from disasters 12.\tUnderstand how to ensure security of information systems, taking into account both technological and human aspects 13.\tEvaluate the ethical issues of information systems, and the impact of information systems in the fraud and crime";
        let projAOSI = "The syllabus of Foundations of Information Systems is aligned with the course \"IS 2010.1 Foundations of Information Systems\" as defined in the \"ACM / AIS IS 2010 Curriculum Guidelines\". For clarification, the topics, presented below, are labelled with topics from this curriculum and also from the taxonomy of the ACM CCS 2012: 1. Enterprise Information Systems for Global Scale a.\tWhat is an enterprise information system? The role of information systems in organizations today. b.\tHow information systems are transforming business. The \"digital enterprise\". Strategic objectives of information systems. c.\tEmerging trends in information systems. Challenges and opportunities of globalization. d.\tDimensions of information systems (technology, organization and processes). Approaches to information systems: technological, behavioural, and socio-technical (the approach of this course). ACM/AIS IS 2010.1 Characteristics of the Digital World ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.1 Globalization ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems 2. E-Business and Collaboration to the Global Scale a.\tBusiness processes and information systems. b.\tTypes of business information systems. c.\tInterconnect systems for the organization. d.\tConcepts of \"e-business\", \"E-Commerce\" and \"E-Government\". e.\tCollaborative and social systems. i.\tWhat is collaboration? ii.\tWhat is \"social business\"? ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.1 The Internet and WWW > E-business ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems ACM CCS 2012 Information systems > Information systems applications > Collaborative and social computing systems and tools ACM CCS 2012 Applied computing > Electronic commerce ACM CCS 2012 Information systems > Applied computing > Computers in other domains > Computing in government > E-government 3. Information, Organizations and Systems Strategy a.\tWhat is an organization? Impact of information systems in organizations. i.\tEconomic impact ii.\tOrganizational and behavioural impact iii.\tImplications of the Internet in the design and understanding of information systems in organizations b.\tThe use of information systems for competitive advantage. i.\tCompetitive forces model of Porter ii.\tStrategies of information systems to deal with competitive forces ACM/AIS IS 2010.1 Information systems in organizations ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems ACM CCS 2012 Information systems > Information systems applications > Process control systems ACM CCS 2012 Applied computing > Enterprise Computing 4. Ethical and Social Issues in Information Systems a.\tMoral dimensions of the information society. b.\tEthics in the Information Society c.\tMoral dimensions of information systems i.\tPrivacy and freedom in the Internet age ii.\tIntellectual property ACM/AIS IS 2010.1 Information systems ethics and crime ACM CCS 2012 Security and privacy > Human and societal aspects of security and privacy ACM CCS 2012 Social and professional topics > Professional topics > Computing profession > Codes of ethics ACM CCS 2012 Social and professional topics > Computing / technology policy > Intellectual property ACM CCS 2012 Social and professional topics > Computing / technology policy > Privacy policies 5. Security and Information Systems a.\tAbuse and vulnerabilities of systems. b.\tValue of security and control c.\tA security structure and control: i.\tControls in information systems ii.\tRisk management iii.\tSecurity policies iv.\tDisaster recovery and business continuity v.\tThe role of the audits ACM/AIS IS 2010.1 Security of information systems ACM CCS 2012 Security and privacy 6. Operational excellence with enterprise applications a. Enterprise systems b.\tManagement systems in supply chains c.\tSystems for customer relationship ACM/AIS IS 2010.1 Business intelligence > Application systems ACM/AIS IS 2010.1 Enterprise-wide information systems ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems 7. Electronic Commerce a.\tElectronic commerce on the Internet b. Markets and digital goods, global markets c.\tBusiness models ACM/AIS IS 2010.1 The Internet and WWW > E-business ACM CCS 2012 Applied computing > Electronic commerce 8. Knowledge Management a.\tThe value chain of knowledge management b.\tTypes of knowledge management systems c.\tContent Management Systems d.\tKnowledge management and collaboration ACM/AIS IS 2010.1 Business intelligence > Information and knowledge discovery ACM CCS 2012 Information systems > Information systems applications > Collaborative and social computing systems and tools 9. Support Decision Making a.\tBusiness intelligence in the organization b. Decision support for the operational management and middle management c.\tDecision support to executive management: balanced scorecard d.\tDecision support systems for group ACM/AIS IS 2010.1 Business intelligence > Application systems ACM/AIS IS 2010.1 Business intelligence > Information Visualization ACM CCS 2012 Information systems > Information systems applications > Decision support systems ACM CCS 2012 Information systems > Information systems applications > Data mining ACM CCS 2012 Information systems > Applied computing > Enterprise computing > Business process management > Business intelligence 10. Construction of Information Systems a.\tInformation Systems as planned organizational change b.\tAnalysis and design of systems c.\tLife cycles of systems d.\tDesign and management of business processes ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.1 Development and acquisition ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems analysis and design ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems planning ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems development 11. Project Management of Information Systems e.\tRunaway projects and system failure f.\tLinking systems projects to the business plan g.\tPortfolio analysis h.\tManaging project risk ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.1 Development and acquisition ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems ACM CCS 2012 Social and professional topics > Professional topics > Computing and business > Socio-technical systems 12. Management Information Systems for Global Scale a.\tThe global environment: \"business drivers\" and challenges b.\tLocation Software c.\tSystems integration on a global scale d.\tManaging global systems ACM/AIS IS 2010.1 Globalization > Global information systems strategies ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems ACM CCS 2012 Applied computing > Enterprise computing > Enterprise interoperability".tokenizeAndStem();

        //bClassifierThesis.addDocument(objAOSI,"Enterprise and Information Systems");
        bClassifierThesis.addDocument(projAOSI, "Architecture and Management of Information Systems");

        //It Governance and Management - OGFI Information Systems Management
        //let objOGFI = "The learning objectives are aligned with those from the course “IS 2010.7 - IS Strategy, Management & Acquisition” in the “ACM/AIS IS 2010 Curriculum Guidelines”: 1. Understand the various functions and activities within the information systems area, including the role of IT management and the CIO, structuring of IS management within an organization, and managing IS professionals within the firm. 2. View an organization through the lens of non-IT senior management in deciding how information systems enable core and supportive business processes as well as those that interface with suppliers and customers. 3. Understand the concepts of information economics at the enterprise level. 4. Appreciate how IS represents a key source of competitive advantage for firms. 5. Structure IS-related activities to maximize the business value of IS within and outside the company. 6. Understand existing and emerging information technologies, the functions of IS and its impact on the organizational operations. 7. Evaluate the issues and challenges associated with successfully and unsuccessfully incorporating IS into a firm. 8. Understand how strategic decisions are made concerning acquiring IS resources and capabilities including the ability to evaluate the different sourcing options. 9. Apply information to the needs of different industries and areas. 10. Understand the role of IT control and service management frameworks from the perspective of managing the IS function in an organization.";
        let projOGFI = "The syllabus corresponds to the course “IS 2010.7 IS Strategy, Management & Acquisition” in the “ACM/AIS IS 2010 Curriculum Guidelines”. The topics below are labeled with topics from that curriculum, as well as the ACM CCS 2012 curriculum. 1. The IS function. IS strategic alignment. ACM/AIS IS 2010.7 The IS function ACM/AIS IS 2010.7 IS strategic alignment ACM/AIS IS.ES Governance of processes and data ACM CCS 2012 Applied computing > IT governance 2. Introduction to COBIT 5. ACM/AIS IS 2010.7 The IS function ACM/AIS IS 2010.7 IS strategic alignment ACM/AIS IS.ES Governance of processes and data ACM/AIS IS 2010.3 IT control and management frameworks ACM CCS 2012 Applied computing > IT governance 3. Strategic use of information. ACM/AIS IS 2010.7 Strategic use of information ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS 2010.ES Strategic alignment ACM/AIS IS 2010.ES Governance of processes and data ACM/AIS IS 2010.ES How enterprise systems support business ACM/AIS IS 2010.INT Process of IS innovation ACM/AIS IS 2010.INT Information organization 4. Impact of IS on organizational structure and processes. ACM/AIS IS 2010.7 Impact of IS on organizational structure and processes ACM/AIS IS 2010.INT Process of IS innovation ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.ES Strategic alignment ACM/AIS IS2010.BPM Using IT for process management and improvement ACM/AIS IS.BPM Organizational issues in business process management ACM CCS 2012 Social and professional topics > Computing and business > Economic impact 5. IS economics. IS planning. ACM/AIS IS 2010.7 IS economics ACM/AIS IS 2010.7 IS planning ACM/AIS IS 2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS2010.ES Strategic alignment ACM/AIS IS2010.ES How enterprise systems support business ACM/AIS IS IS2010.INT Process of IS innovation ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change 6. Role of IS in defining and shaping competition. ACM/AIS IS 2010.7 Role of IS in defining and shaping competition ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS 2010.3 Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.3 Strategic alignment ACM/AIS IS 2010.INT Process of IS innovation 7. Managing the information systems function. ACM/AIS IS 2010.7 Managing the information systems function ACM/AIS IS 2010.4 The role of IT control and service management frameworks (COBIT, ITIL, etc.) in managing the organizational IT infrastructure ACM CCS 2012 Social and professional topics > Professional topics > Computing profession 8. Financing and evaluating the performance of information technology investments and operations. ACM/AIS IS 2010.7 IS economics ACM/AIS IS 2010.7 Financing and evaluating the performance of information technology investments and operations ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.3 Total cost of ownership and return on investment ACM/AIS IS Enterprise Systems: Making the case for acquiring and implementing enterprise systems ACM/AIS IS IS Innovation and New Technologies: Economics of digital goods and services ACM CCS 2012 Social and professional topics > Management of computing and information systems > Information system economics ACM CCS 2012 Social and professional topics > Computing and business > Economic impact 9. Acquiring information technology resources and capabilities. ACM/AIS IS 2010.7 Acquiring information technology resources and capabilities ACM/AIS IS 2010.1 Development and acquisition ACM/AIS IS 2010.4 Purchasing of IT infrastructure technologies and services ACM/AIS IS 2010.6 Different approaches to implementing information systems to support business requirements ACM/AIS IS 2010.BPM Organizational issues in business process management ACM/AIS IS 2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.ES Selection of enterprise systems software ACM CCS 2012 Social and professional topics > Professional topics > Computing and business > Offshoring 10. IS risk management. ACM/AIS IS 2010.7 IS risk management ACM/AIS IS 2010.1 Security of information systems ACM/AIS IS 2010.3 Risk management ACM/AIS IS 2010.3 Business continuity ACM/AIS IS 2010.4 Securing IT infrastructure ACM/AIS IS 2010.4 Ensuring business continuity ACM/AIS IS.AC Information technology risks ACM/AIS IS.AC Auditing ethics, guidelines, and standards of the profession ACM/AIS IS.SRM Risk assessment frameworks ACM/AIS IS.AC Policy and management issues Gestão de Versões · Bolonha https://fenix.tecnico.ulisboa.pt/bolonhaManager/competenceCourses/... 4 de 5 18-03-2015 15:01 11. Using IS/IT governance frameworks. ACM/AIS IS 2010.7 Using IS/IT governance frameworks ACM/AIS IS 2010.4 The role of IT control and service management frameworks (COBIT, ITIL, etc.) in managing the organizational IT infrastructure ACM/AIS IS.AC Controls over information and processes ACM/AIS IS.SRM Risk assessment frameworks ACM CCS 2012 Applied computing > IT governance 12. Using IS/IT governance frameworks. ACM/AIS IS 2010.7 Using IS/IT governance frameworks ACM/AIS IS 2010.3 Audit and compliance ACM/AIS IS 2010.3 IT control and management frameworks ACM/AIS IS AC Controls Assessment ACM CCS 2012 Applied computing > IT governance".tokenizeAndStem();
        bClassifierThesis.addDocument(projOGFI, "Architecture and Management of Information Systems");

        //Information Systems Modeling (Ead)
        let ead = " requirements engineering. •\tProcess and techniques of requirements development: requirements elicitation and analysis, requirements writing, requirements validation. • Process and techniques of requirements management. • Introduction to UML. • System structure modeling. • Use cases modeling. • Interactions modeling. • Life cycles modeling. • System behavior modeling. • Non-functional requirements.".tokenizeAndStem();
        bClassifierThesis.addDocument(ead, "Architecture and Management of Information Systems");

        //Knowledge Management and Organization Learning
        let kmol = "Knowledge and Learning in Organization Organizational Knowledge Management - 1st Generation: products oriented: data mining, document management, expert systems, Knowledge Engineering Organizational Knowledge Management – 2nd Generation: oriented to knowledge processes, to tacit knowledge and to innovation and knowledge creation Organizational Learning: enterprise longevity: organizational learning disabilities; single and double loop learning, importance of tacit knowledge; role of practice and context; learning organizations Community of Practice: understand and cultivation of Communities of Practice; Computer platforms for cooperative work and community support The Teaching / Learning Process – Learn to Learn, Learn to Unlearn; Learn to Change, Cooperative Learning, Learn through Reflective Practice; Learn through Action Research Qualitative Research Methods".tokenizeAndStem();
        bClassifierThesis.addDocument(kmol, "Architecture and Management of Information Systems");

        ///////Tecnologias de Sistemas de Informação -> Information Systems Technologies
        //Data Administration in Information Systems - AOBD
        //let objAOBD = "The course on Data Administration in Information Systems aims at providing to students the skills needed to manage, optimize and effectively use modern database systems for managing large volumes of data. Students should be able to: 1. understand the internal mechanisms of a relational Database Management System (DBMS),, including storage management, indexing, processing and optimizing queries, transaction management, concurrency control, and recovery management 2. understand the tasks involved in database administration 3. optimize information access in databases that store very large amounts of data 4. acquire basic knowledge about the various architectures of parallel and distributed databases, including conventional (SQL) and unconventional (NoSQL) database systems.";
        let projAOBD = "Data Administration in Information Systems mostly includes topics from the Information Management (IM) area in the ACM CS 2013 Curriculum. The course topics, which are presented next, are labeled with the topics from this curriculum, and with the topics from the ACM CCS 2012 taxonomy, for further clarification: 1. Storage (sub-)systems a. Storage technologies (e.g., RAID) b. Replication c. Architectures ACM CS IM/Database Systems > Components of database systems ACM CS IM/Physical Database Design > Storage and file structure ACM CCS 2012 Information systems > Information storage systems > Information storage technologies 2. Indexing algorithms and file organization a. Record storage b. Buffer management c. Data access ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Indexing ACM CCS 2012 Information systems > Information storage systems > Record storage systems ACM CCS 2012 Information systems > Database management system engines > Record and buffer management 3. Query processing a. Query execution planning b. Algorithms c. Optimization ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CCS 2012 Information systems > Database management system engines > Database query processing 4. Concurrency control a. Locking protocols b. Timestamping protocols c. Multi-version protocols ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Transaction Processing > Concurrency control ACM CCS 2012 Information systems > Database management system engines > Database transaction processing 5. Data recovery a. Logging b. Failure of non-volatile storage c. Backups ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Transaction Processing > Failure and recovery ACM CCS 2012 Information systems > Database management system engines > Database transaction processing > Database recovery 6. Database optimization a. Schema-level optimization b. Query optimization ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CCS 2012 Information systems > Database management system engines > Database query processing ACM CCS 2012 Information systems > Database design and models > Relational database model ACM CCS 2012 Information systems > Data structures > Data access methods 7. Index optimization a. Clustering b. Covering indexes ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CS IM/Indexing ACM CCS 2012 Information systems > Information storage systems > Record storage systems > Record storage alternatives ACM CCS 2012 Information systems > Information storage systems > Record storage systems > Directory structures 8. Optimizing the hardware and the operating systems a. Threads, buffers and storage b. Database performance ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CS IM/Transaction Processing > Interaction of transaction management with storage, especially buffering ACM CCS 2012 Information systems > Database management system engines > Record and buffer management ACM CCS 2012 Information systems > Database administration > Database performance evaluation 9. Parallel and distributed databases a. Architectures b. Partitioning c. Algorithms d. Systems based on map-reduce ACM CS IM/Database Systems > Approaches for managing large volumes of data ACM CS IM/Distributed Databases ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > Relational parallel and distributed DBMSs ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > MapReduce-based systems 10. NoSQL databases a. Key-value storage databases b. Document databases c. Column-oriented databases d. Databases for graph data ACM CS IM/Database Systems > Approaches for managing large volumes of data ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > Key-value stores ACM CCS 2012 Information systems > Information retrieval".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAOBD,"Enterprise and Information Systems");
        bClassifierThesis.addDocument(projAOBD, "Information Systems Technologies");

        //Data Analysis and Integration - GTI
        //let objGTI2 = "The course on Data Analysis and Integration aims at teaching the students the most important concepts of data integration according to two different perspectives: virtual data integration, where the data sources can be accessed through a mediator-based architecture; and materialized data integration, where a materialized data repository (named data warehouse) is populated with data coming from the data sources. Additionally, the course will teach techniques that can be used to exploit information: OLAP (On-line Analytical Processing) and reporting in a warehoused architecture, and mash-up systems in a virtual architecture. The data integration processes aim at supplying, among other applications, a uniform view over a set of autonomous and heterogeneous data sources, making it easy the access to source data for analysis and visualization purposes. Their application domains are diverse, ranging from the Business Intelligence systems to scientific research systems (e.g., Bioinformatics).";
        let progGTI2 = "The course syllabus for Data Analysis and Integration includes mostly topics from the Information Management (IM) " +
            "area in the ACM/IEEE CS 2013 Curriculum. The course topics, which are presented next, are labeled with the topics from this" +
            " curriculum, and with the topics from the ACM CCS 2012 taxonomy, for further clarification: 1.tMain challenges of data " +
            "integration processes; data integration paradigms. Heterogeneous data sources: XML data management and processing. Declarative and navigational queries, Information M" +
            "anagement Concepts, Information capture and representation, Data Modelling, Semi-structured data model, information systems, data management systems".tokenizeAndStem();

        //bClassifierThesis.addDocument(objGTI2,"Enterprise and Information Systems");
        bClassifierThesis.addDocument(progGTI2, "Information Systems Technologies");

        //Data Science
        //let objRSIPR5 = "Students should be able to: •\tUnderstand the statistics and data processing concepts used in complex information processes. •\tDesign systems for knowledge discovery processes automation, and communication of their outcomes using the appropriate algorithms and validation methods at each stage. •\tUnderstand the techniques for frequent patterns recognition and outlier detection in data sets. • Identify sensitive data that might be subject to processing restrictions and data anonymization techniques that enable privacy-preserving data mining, •\tAddress large-scale data processing challenges.";
        let objRSIPR5 = "1.\tData Science. What is data science? The multidisciplinary nature. Data engineering vs. Data science. The role of a data scientist. 2. Knowledge Discovery Process. Formulating questions. Exploratory data analysis. Pre-processing overview. Evaluation overview - Occam’s razor. Information Visualization overview. Documenting the process: Notebooks. 3.\tPre-processing. Data scaling and centring. Data reduction: PCA, SVD, DFT, wavelets, SAX. Data balancing: resampling and SMOTE. Data discretization: equal-width, equal-frequency, taxonomies. Labelling. 4.\tPattern Mining. Association rules - apriori algorithm. Closed vs Maximal patterns. Evaluation metrics: support, confidence, lift and Jaccard 5.\tClustering. Algorithms: K-means, hierarchical. Evaluation: SSE (MSE), silhouette coefficient, Dunn and DB indexes. 6.\tClassification and Regression. Supervised learning: overfitting, training strategies, cross-validation. Linear and logistic regression. Classification Algorithms: KNN, Naive Bayes, Decision trees: metrics and pruning. Ensembles: AdaBoost, Random forests. Evaluation: Metrics (Accuracy, sensibility and specificity, f-measure, ROC area, confusion matrix); ROC and Lift charts 7.\tOutliers detection. 8.\tPrivacy-preserving data mining. 9.\tLarge-scale data mining. Parallelization: map-reduce, online algorithms. Indexing: LSH, Multidimensional. 10.\tCase Studies / Advanced Topics (9h) Time series and sequential analysis. Social Networks analysis; Mining graphs. Recommender Systems, Computational Advertising. Text and opinion mining. Process Mining. Stream Processing and Mining. Computational biology".tokenizeAndStem();
        bClassifierThesis.addDocument(objRSIPR5, "Information Systems Technologies");

        //Business Process Management - ETPN
        //let objETPN = "This course provides an engineering perspective on the fundamental concepts, techniques and tools associated with the business process management life-cycle. The topics addressed in this course focus on the identification, documentation, modelling, validation and verification, and optimization of organizational business processes using process analysis, design and automation techniques. The learning objectives are as follows: 1.\tUnderstand the role of business processes within and between organizations. 2.\tUnderstand the relationships and dependencies between processes, enterprise architecture and the application and technological infrastructure. 3. Analyse and design business processes using business process modelling languages. 4.\tAnalyse business processes using manual, semi-automated and automated techniques, including architectural principles and process mining. 5.\tRedesign and optimize business processes while keeping the traceability to the transformation requirements. 6.\tUnderstand the role of business process management systems (BPMS). 7.\tUnderstand the role of BPM tools, especially modelling and analysis tools.";
        let projETPN = "1.\tIntroduction to Business Process Management ACM CCS2012: Business Process Modelling, Enterprise architecture modeling 2. Process Identification ACM CCS2012: Business Process Modelling, Enterprise architecture modeling, Enterprise architecture frameworks, Reference Models 3.\tProcess Modeling ACM CCS2012: Business Process Modelling, Event-driven architectures, Business rules, Cross-organizational business processes, Enterprise architecture frameworks, Enterprise architecture modeling 4. Process Discovery ACM CCS2012: Business process modelling, Business intelligence, Business process monitoring, Business process management systems 5.\tProcess Conformance ACM CCS2012: Business intelligence, Business-IT alignment, Business process management systems 6.\tProcess Analysis ACM CCS2012: Business intelligence, Business-IT alignment, Business process management systems, Reference models 7.\tProcess Redesign ACM CCS2012: Business process modelling, Enterprise architecture modeling, Business-IT alignment, Reference Models 8.\tProcess Automation ACM CCS2012: Business process management systems, Enterprise computing, IT architectures";
        //bClassifierThesis.addDocument(objETPN,"Enterprise and Information Systems");
        bClassifierThesis.addDocument(projETPN, "Information Systems Technologies");

        //Health Ict - TIS
        //let objTIS = "The general objective of the course is to provide the fundamental principles and concepts related to the use of information technology in health care. The students will acquire essential competencies and knowledge on the use of information technology in biomedical research and its crucial role in the provision of health care services.";
        let projTIS = "1. Information Technology in the life sciences 2. Clinical information systems 3. Acquisition processing and use of biomedical data. The Electronic Health Record. 4. Health Informatics data interchange standards. Thesauri and Ontologies. 5. Natural language processing and biomedical text mining. 6. Clinical Decision-support Systems. 7. Tele-monitoring 8. Tele-Health 9. Bioinformatics and Biomedical Research Infrastructures. 10. Information Search 11. Personalised medicine 12. Ethical Legal and Social Issues in IT in Health. 13. Public Health Informatics 14. IT for Healthy Living and Active Ageing. Consumer Health Informatics. 15. IT in user training and education of health professionals";
        //bClassifierThesis.addDocument(objTIS,"Bioinformatics and Computational Biology");
        bClassifierThesis.addDocument(projTIS, "Information Systems Technologies");

        //        Enterprise Integration
        let projEI = "The course aims at providing a coherent structure of integration topics that can be found in different parts of the ACM/AIS IS 2010 curriculum, such as “Enterprise Systems” and “Application Development”. When appropriate, this syllabus is labeled with topics from that curiculum and also from the ACM CCS 2012 taxonomy: 1. Evolution of information systems a. essential functions of information systems in business organizations; b. evolution of information systems architecture over the years; point-to-point vs. centralized integration; c. integration based on the concept of service. ACM/AIS IS 2010.1 Information Systems in Organizations ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise Information Systems 2. Introduction to integration platforms a. message exchange; b. message schema and transformation; c. ports and adapters; d. orchestrations; e. business rules. ACM/AIS IS 2010.3 Systems Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Data exchange; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Service buses; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Enterprise application integration tools; ACM CCS 2012 Applied Computing > Enterprise Computing > Business rules 3. Messaging systems a. fundamental concepts; b. message transactions; c. message acknowledgments; d. message correlation; e. messaging platforms. ACM/AIS IS 2010.AD Application Integration ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise interoperability > Enterprise application integration; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Distributed transaction monitors; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Message queues 4. Message brokers a. message-level integration vs. orchestration-level integration; b. publish-subscribe with message filters; c. message properties; d. message correlation; e. asynchronous messaging. ACM/AIS IS 2010.AD Application Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Mediators and Data Integration; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers 5. Adapters a. three-tier client-server model; b. capture of the user interface; c. integration through files; d. database access APIs; e. retrieving data in XML; f. data access in orchestrations; g. methods and interfaces; h. interface discovery and dynamic invocations; i. Web service invocation in orchestrations. ACM/AIS IS 2010.3 Data Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Data exchange; ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Mediators and Data Integration ACM CCS 2012 Information Systems > World Wide Web > Web services ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers 6. Services and SOA a. services and applications; b. service composition; c. service orchestration; d. business processes; e. service design principles; f. benefits of SOA; g. support for human workflows. ACM/AIS IS 2010.3 Service oriented architecture ACM CCS 2012 Applied Computing > Enterprise Computing > Service-oriented architectures; ACM CCS 2012 Applied Computing > Enterprise Computing > Business process management > Business process management systems 7. Service orchestrations a. block structure; b. beginning the flow; c. message construction; d. flow control with loops, decisions, and parallelism; e. orchestrations as sub-processes; f. concurrent events; g. correlations; h. exception handling; i. transactions and compensation. ACM/AIS IS 2010.ES Business process integration ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Enterprise application integration tools; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Distributed transaction monitors 8. Inter-organizational integration a. electronic data exchange; b. introduction to supply chain management; c. supply chain coordination; d. electronic commerce; e. negotiation protocols. ACM/AIS IS 2010.1 Supply Chain Management ACM/AIS IS 2010.ES Production logistics ACM CCS 2012 Information Systems > World Wide Web > Web applications > Electronic commerce > Electronic data interchange; ACM CCS 2012 Applied Computing > Enterprise Computing > Business process management > Cross-organizational business processes 9. Internet of things a. physical world and virtual world integration; b. traceability systems; c. sensors and complex event processing; d. logistics systems based on RFID. ACM/AIS IS 2010.ES Enterprise Systems > Production logistics ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise computing > Event-driven architectures ACM CCS 2012 Information systems > Information systems applications > Spatial-temporal systems > Data streaming".tokenizeAndStem();
        bClassifierThesis.addDocument(projEI, "Information Systems Technologies");

        //Information Processing and Retrieval - RGI
        //let objRGI= "This course aims to provide the students with an complete and updated introduction to the key-concepts and technologies used for data processing in the areas of Information Retrieval (IR), Information filtering (IF) and Information Extraction (IE). Students of this course will learn the basic theoretical concepts and acquire the practical skills needed to: 1.\tDesign modern solution for processing, managing and querying large volumes of information; 2.\tClassify and group automatically sets of resources (e.g. large sets of textual documents); 3.\tDesign search and filtering mechanisms for large collections; 4.\tDesign systems to extract information from text and/or the Web; 5.\tEvaluate empirically such systems.";
        let projRGI = "•\tIntroduction to Information Retrieval and Information Extraction ◦\tIR system architecture ◦\tDocument pre-processing •\tNon-structured data models ◦\tBoolean model ◦\tVector-space model ◦\tDimensionality reduction ◦\tProbabilistic models •\tInformation Extraction from text ◦\tClassification and clustering of documents ◦\tThe naive Bayes classifier ◦\tInformation Extraction with hidden Markov models • Evaluation of IR Systems ◦\tEvaluation metrics ◦\tReference collections ◦\tCross-validation and other issues •\tSemi-structured data models ◦\tSemi-structured data models ◦\tThe Extensible Markup Language (XML) ◦\tMarkup languages based on XML (e.g., TEI, METS, MODS) ◦\tOther languages (e.g., SGML, HTML e RDF) •\tWeb Data Extraction ◦\tWrapper generation ◦\tThe XQuery language ◦\tIR in XML documents •\tLink analysis ◦\tWeb models ◦\tBasic concepts on graphs and link analysis ◦\tUsing links to rank documents ◦\tWeb crawling •\tIndexing and querying non-structured information ◦\tRegular expressions ◦\tInverted Indexes ◦\tQuery processing •\tSimilarity search ◦\tDocument shingling and the Jaccard similarity measure ◦\tSimilarity-preserving summaries of sets and min-hash ◦\tLocality-sensitive hashing ◦\tApplications in multimedia retrieval •\tRecommendation systems ◦\tContext, personalization and information filtering ◦ Content-based recommendations ◦\tCollaborative filtering •\tDistributed processing for IR and IE ◦\tData partitioning ◦\tFederated search and meta-search engines ◦\tMap-Reduce processing •\tIE and IR applications ◦\tEnterprise search and expert search ◦\tDigital libraries ◦ Opinion mining ◦\tOther applications";
        //bClassifierThesis.addDocument(objRGI,"Language and Information Technologies");
        bClassifierThesis.addDocument(projRGI, "Information Systems Technologies");

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        //////////// Scientific Area of Graphic Computing and Multimedia
        /////////// Área Científica de Computação Gráfica e Multimédia
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////Interaction and Multimedia

        //Interactive Visual Communication - CVI
        //let objCVI = "The goal is to provide students with knowledge and competencies needed for the effective communication of concepts, trneds and information based on interactive graphic applications. We’ll describe the relevant specificities of different data types that can be used to communicate, and the best way of using and combining them towards that end. Next, we’ll teach metadata and descriptor extraction techniques from the different media, with an emphasis in images, thus allowing their more efficient manipulation and usage. Indexing and retrieving media based on that metadata will be studied next. Possessing the data in an easy to use format, students will then learn how to visually represent and explore them, interactively. Finally, we’ll approach the question of how best to present concepts, trends and information with the creation of public multimedia presentations, maximizing their impact and the amount of information apprehended by the audience.";
        let projCVI = "1.\tIntroduction 2.\tImages and other Media 3.\tMetadata and Content Information 4.\tThe special case of personal information: PIM and Lifelogging 5.\tFeature Extraction and Indexing 6.\tRetrieval evaluation 7.\tGraphic design principles 8.\tHuman Factors 9. Communicating with data 10.\tPhotography, Video and Animations 11.\tMultimedia Presentations".tokenizeAndStem();
        //bClassifierThesis.addDocument(objCVI,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projCVI, "Interaction and Multimedia");

        //User Centered Design - CCU
        //let objCCU = "Understand the basic principles and the methodologies of interactive systems user centred design. Understand users and their needs, how to really acquire them, and the need of user involvement in interactive systems design and implementation. Adapt the above knowledge to user centered design methodologies. Design and implement an interactive system involving real users at various levels in light of the above.";
        let projCCU = "Lectures: Introduction to User Centered Design. Users and Stakeholders. Inquiring Users and Experts. Observing Users. User Involvement and Participation. User Needs and Requirements. Usability Engineering. Data Analysis and Interpretation. Building Prototypes. Interface Types. Affective Aspects. Accessibility. Ethics in User Centered Design. Laboratory: Workshops with the following themes: Who are the Users? What the Users want? Applying Cultural Probes Workshops with Users Initial Requirements Validation of Requirements Conceptual Model and First Low Fidelity Prototypes. Usability Testing. Low Fidelity Prototypes. Functional Prototype.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objCCU,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projCCU, "Interaction and Multimedia");

        //Internet of Things Interaction Design
        //let objIOT2 = "Students should be able to: Understand how Internet of Things (IoT) Interaction Design differs from traditional disciplines of Human-Computer Interaction (HCI); Think beyond “brick” devices (e.g. phones, tablets) to IoT environments and new interaction modalities; Apply Interaction Design techniques to ideate and prototype novel IoT concepts; Gain skills in developing interactive prototypes that combine software and hardware in new ways; Gain a foundation of contemporary and classic research in the fields of Interaction Design and Ubiquitous Computing; Understand challenges in evaluating the user experience of IoT-based systems and environments.";
        let projIOT2 = "1.\tInteraction Design and the Internet of Things a.\tWhat is Interaction Design b.\tWho creates Interaction Design c.\tWhat is the Internet of Things d.\tChallenges of designing for IoT Experiences 2.\tTechniques for Designing User Experiences a.\tSketching b.\tThe design funnel c.\tSketching with templates and foam core d.\tCreating sequential and narrative storyboards e.\tUser research techniques: Uncoverting the mental model, Wizard of Oz, and Think Aloud 3.\tPrototyping tools for the Internet of Things a.\tArduino for interactive objects b.\tKinect sensors for interactive spaces 4.\tDisciplines of Human-Computer Interaction within the Internet of Things a.\tTangible interaction b.\tWearable interaction c.\tContext-aware environments 5.\tInput and Output Technologies for IoT a.\tTouchscreens, from smartwatches to wall displays b.\tVoice interaction c.\t3D gestures d.\tOther input modalities from accoustic input to brain signals e. Audio output f.\tHaptic feedback, from vibrotactile to muscle-propelled feedback g.\tOther output modalities 6.\tEvaluating User Experience of IoT systems a.\tChallenges b.\tResearch methods c.\tQualitative and Quantitative analysis".tokenizeAndStem();
        //bClassifierThesis.addDocument(objIOT2,"Distributed Systems and Operating Systems");
        bClassifierThesis.addDocument(projIOT2, "Interaction and Multimedia");

        //Game Design - DDJ
        //let objDDJ = "This course grants the students the opportunity to develop their skills on experience design and prototyping for games. The learning process is sustained in the discussion of what is a game, what are its components and what is its relation to the players (having in mind their differences). It is expected that the student develop design documents and prototypes to support his/her work on the course.";
        let projDDJ = "Components of game design Definitions of game and play History of videogames: classic and modern examples Game theory Player models Player experience Theory of fun Gameplay: world, scenarios, abstractions, progression and balancing Categorization: game genres and challenges Narrative and character development Emotion in games The creative process Documentation: concept, treatment and script Game design rules The business of games and entrepreneurship".tokenizeAndStem();
        //bClassifierThesis.addDocument(objDDJ,"Games");
        bClassifierThesis.addDocument(projDDJ, "Interaction and Multimedia");

        //Multimedia Content Production - PCM
        //let objPCM = "Know the different types of multimédia information and how to manipulate them to poduce multimedia content. To understand the technological constraints that affect Production. To understand critical factors affect the success of a production, namely in aspects such as capture, encoding, processing and visualization of the different media. To know the different kinds of available authoring tools. To create Multimedia contents; To identify the different contexts in which multimedia can be consumed, with emphasys on online and network issues (evaluate bandwidth, latency, synchronization, etc.) and mobile devices. Introduce some advanged multimedia usages such as procedural modelling, generative art augmented reality. Apply efficient methods of multimedia content retrieval.";
        let projPCM = "1.\tMultimedia Data Types a.\tText b.\tBitmap Images c.\tVector Images and SVG d.\tSound e.\tVideo f.\tAnimations 2.\tProcessing and Visualization of multimedia signals 3.\tCapture and encoding of multimedia information 4.\tMultimedia design principles 5.\tLinear and Non-Linear edition of audio and video 6.\tSynchronization 7.\tScripting languages and interactive applications 8.\tMultimedia and networks 9.\tMobile multimedia 10.\tAdvanced multimédia applications 11.\tContent-based multimedia retrieval 12.\tMultimédia databases".tokenizeAndStem();
        //bClassifierThesis.addDocument(objPCM,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projPCM, "Interaction and Multimedia");

        //Usability and Information Systems
        let projUIS = "1. Usability and Usability Engineering 2. Requirements Gathering (User and Task Analysis) 3. Methods for Data Collection 4. Human Factors 5. Conceptual and Mental Models 6. Interaction Styles 7. Screen Design and Prototyping 8. Heuristic evaluation and Evaluation with users 9. Evaluation Data Analysis 10. Web Usability".tokenizeAndStem();
        bClassifierThesis.addDocument(projUIS, "Interaction and Multimedia");

        ////////////Visualização Gráfica -> Graphical Visualization
        //Three-Dimensional Vizualization and Animation - AVT
        //let objAVT = "This course introduces design and development techniques for 3D real-time interactive applications by using graphic APIs such as Modern OpenGL and WebGL. It includes the development of an immersive 3D game for mobile devices by using a low-cost VR glasses set. The course covers also the latest advances in GPU technology and their applications to simulation and computer games. Students should be able to describe and justify methods, procedures and example systems used in Real-Time Interactive Virtual Environments, by identifying the underlying terms, concepts and base principles.";
        let projAVT = "Real-Time Image Synthesis, 3D Viewing Pipeline (Modern OpenGL and WebGL), GLSL Shading language programming, Scenes description formats, 3D Geometric Transformations; Visual Appearance: advanced Lighting and Texturing (Bump mapping and Environmental mapping); Collision Detection, Special visual effects: lens flare, stencil, billboards, particle systems; Stereoscopic effect; Acceleration Techniques for games and simulators".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAVT,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projAVT, "Graphical Visualization");

        //Computer Graphics for Games - CGJ
        //let objCGJ = "This course covers both theory and practice of game engine software development. It delves into the different engine subsystems including, but not limited to, rendering, character animation, and physics, and details the articulation required to support gameplay development. By the end of this course, students should understand how modern game engines work, and be able to design and develop their own game engines.";
        let projCGJ = "Introduction to game engine development. Architecture of a game engine. Asset pipeline and management. Real-time simulation loops. Human interface devices. 3D mathematics for games. Viewing pipeline: modelling, viewing, lighting, texturing. GPU rendering pipeline and shader programming. Visual effects. Advanced lighting, global illumination and shadows. Scene management. Animation systems. Collision and rigid body dynamics. Audio systems. Online multiplayer/networking. Runtime gameplay systems.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objCGJ,"Games");
        bClassifierThesis.addDocument(projCGJ, "Graphical Visualization");

        //3d Programming - PSJ
        //let objPSJ = "This course introduces the concepts and theory of a modern photorealistic rendering. Through the ideas and software in this course, the students will learn to design and develop a rendering system for creating stunning imagery. It covers also the development of a Unity 3D-based application by using its Assets library and the built-in shaders for photorealistic appearance.";
        let projPSJ = "Rendering Equation, Photorealistic Rendering and the Ray-Tracing Algorithm, Geometry Intersection techniques, Acceleration Structures: Grids, KD-Trees and Bounding-Volumes Hierarchy; Materials, Monte Carlo Integration, BRDF and Light Sampling, Combined Sampling & Path Tracing, Photon Mapping, Unity 3D game engine: GUI, game objects and components, lights, materials, rigid bodies, scripting, input and character control, cameras, prefabs, colliders, triggers and shaders.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objPSJ,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projPSJ, "Graphical Visualization");

        //Information Visualization - VI
        //let objVI = "This course introduces design and development techniques for 3D real-time interactive applications by using graphic APIs such as Modern OpenGL and WebGL. It includes the development of an immersive 3D game for mobile devices by using a low-cost VR glasses set. The course covers also the latest advances in GPU technology and their applications to simulation and computer games. Students should be able to describe and justify methods, procedures and example systems used in Real-Time Interactive Virtual Environments, by identifying the underlying terms, concepts and base principles.";
        let projVI = "Real-Time Image Synthesis, 3D Viewing Pipeline (Modern OpenGL and WebGL), GLSL Shading language programming, Scenes description formats, 3D Geometric Transformations; Visual Appearance: advanced Lighting and Texturing (Bump mapping and Environmental mapping); Collision Detection, Special visual effects: lens flare, stencil, billboards, particle systems; Stereoscopic effect; Acceleration Techniques for games and simulators".tokenizeAndStem();
        //bClassifierThesis.addDocument(objVI,"Interaction and Multimedia");
        bClassifierThesis.addDocument(projVI, "Graphical Visualization");

        //Virtual Reality
        let progVR = "1 VR systems & History of VR VR as a discipline. Basic features of VR systems. Architecture of VR systems. 2 VR hardware VR input hardware: tracking systems, motion capture systems, data gloves. VR output hardware: visual displays. 3 Stereoscopic Vision Fundamentals of the human visual system. Depth cues. Stereopsis. Retinal disparity and parallax. 4 Haptic rendering Haptic sense. Haptic devices. Techniques for haptic rendering 5 VR software development Challenges in VR software development. Windowing, viewing, input/output and networking issues. 6 VR software development AR software. Camera parameters and camera calibration. Marker-based augmented reality. Pattern recognition. AR Toolkit 7 3D user interfaces Why 3D user interfaces. Major user tasks in VE. Interaction techniques for selection, manipulation and navigation. 3DUI evaluation. 8 Presence Presence: concept, definition, measurement and applications.".tokenizeAndStem();
        bClassifierThesis.addDocument(progVR, "Graphical Visualization");

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        //////////// Scientific Area of Ariticial Intelligence
        /////////// Área Científica de Inteligência Artificial
        ///////////////////////////////////////////////////////////

        ////////Sistemas Inteligentes

        //Autonomous Agents and Multi-Agent Systems - AASMA
        //let objAASMA = "•\tTo acquire general notions about agents and multi-agent systems; knowing how to identify and classify agents and environments, according to different properties. •\tKnowing how to develop complex systems and systems from different application areas, using an agent-oriented methodology. •\tKnowing how to define a society of agents in order to solve a specific problem. •\tBeing able to design agents with reactive, deliberative and hybrid architectures. •\tBeing able to create societies of agents that communicate, in a practical way, using suitable languages and platforms.";
        let projAASMA = "1.\tAgents and Environments a.\tThe concept of agent. b.\tProperties of agents. c.\tProperties of environments. d.\tApplications. e. Abstract agent architectures. 2.\tReactive Architectures a.\tPurely reactive agents. b.\tBrooks’ subsumption architecture. 3.\tDeliberative Architectures a.\tThe intentional stance. b.\tThe BDI model. Practical reasoning agent architectures. c.\tProcedural Reasoning System. 4. Hybrid Architectures a.\tHorizontal and vertical hybrid architectures. b.\tTouringMachines and InteRRaP. 5.\tEmotion-based Architectures a.\tAppraisal theories. b.\tThe concept and role of emotion. c.\tAgents with emotions. d.\tImpact on the studied architectures. e.\tExisting models and systems. 6.\tSocieties of Agents and Emergence a.\tSocieties of agents. Stigmergy, self-organization and emergence. b. Case studies - Game of life, BOIDS and crowds. 7.\tGame Theory a.\tIntroduction to game theory – fundamental concepts and properties. b.\tThe prisoner’s dilemma. Nash equilibrium. c.\tRepeated games. 8.\tCommunication among Agents a.\tCommunication. b. Speech acts. c.\tSemantics. KQML and KIF. FIPA-ACL. 9.\tCoordination and Cooperation among Agents a.\tCooperative distributed problem solving. b.\tThe Contract Net protocol. 10.\tNegotiation among Agents a.\tNegotiation - mechanisms/protocols and strategies. b. Auctions – characteristics and types of auction. c.\tNegotiating/bargaining in task-oriented domains. Monotonic Concession Protocol and Zeuthen Strategy. 11.\tAgent Development a.\tAgent-oriented programming. b.\tMethodologies and pitfalls in the development of agents and multi-agent systems. 12.\tMachine Learning in Agents a.\tReinforcement learning in single-agent scenarios and multi-agent scenarios. Q-learning. b.\tThe problem of coordination. 13.\tHuman-agent interaction. 14.\tApplications of agents and multi-agent systems.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objAASMA,"Intelligent Systems");
        bClassifierThesis.addDocument(projAASMA, "Intelligent Systems");

        //Machine Learning
        //let objRSIPR4= "This course aims to provide a complete and up-to-date introduction to key concepts in machine learning. After completing the course, students should be able to: •\tUnderstand the main challenges involved in machine learning. •\tUnderstand and correctly apply the steps needed to train and validate a model that is able both to explain a set of data and make predictions about unseen data. •\tUnderstand and correctly apply the more common machine learning algorithms, recognizing their corresponding domain of application.";
        let projRSIPR4 = "1.\tIntroduction to Machine Learning 2.\tBackground a)\tProbability and information theory b)\tLinear algebra c)\tOptimization 3. Introduction to supervised learning - Linear Methods a)\tLinear regression b)\tLogistic regression and perceptron 4.\tFundamentals of learning theory a)\tThe bias-variance tradeoff b)\tOverfitting and underfitting c)\tRegularization d)\tModel selection e)\tStatistical learning theory 5.\tSupervised learning - Non-parametric methods a)\tk-nearest neighbors b)\tLocally weighted regression 6.\tSupervised learning - Decision Trees and ensemble methods a)\tDecision trees b)\tRegression trees c)\tEnsemble methods 7.\tSupervised learning - Bayesian methods a)\tNaive Bayes b)\tBayesian linear regression c)\tBayes nets 8.\tSupervised learning - Kernel methods a)\tMax-margin classifiers b)\tKernel regression 9.\tSupervised learning - Artificial neural networks a)\tMultilayer perceptron b)\tBackpropagation c) Convolutional networks d)\tRecurrent networks e)\tRegularization 10.\tUnsupervised learning a)\tk-means b)\tMixture models and Expectation-Maximization c)\tPCA and ICA d)\tAutoencoders 11.\tApplications a)\tText classification b)\tImage classification".tokenizeAndStem();
        //bClassifierThesis.addDocument(objRSIPR4,"Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR4, "Intelligent Systems");

        //Intelligent Multimedia Databases
        let imd = "-Multimedia Data -Introduction, examples (iTunes) -Compression and the role and origin of metadata (MPEG etc) -Multimedia and SQL -Human sensory system -Visual System -Acoustic System -Multimedia metadata (MPEG 7) -Querying Multimedia data -Content Based Multimedia Retrieval -Feature Selection and Extraction -Indexing Methods -Spatial access methods -Generic multimedia indexing -Subspace method -Querying and Information fusion -Modeling Multimedia Data -Associative Memory -Semantic Modeling -Multimedia Database Architecture -Client server system and storage parameters -Multimedia and the Internet -Examples of Image, Video and Music databases".tokenizeAndStem();
        bClassifierThesis.addDocument(imd, "Intelligent Systems");

        //Natural Language - LN
        //let objLN2 = "•\tLearn the basic concepts, main formalisms, techniques and algorithms, knowledge bases and corpora, used in the Natural Language Processing area. •\tUnderstand the main tasks involved in the processing of a sentence, paragraph or text and understand the main challenges of each one of these tasks. •\tLearn the main applications and be able to identify the associated technology. •\tUnderstand which are the tasks that can be done considering the current state of the art.";
        let projLN2 = "Natural Language Processing (3h 30) Basic concepts Ambiguity and linguistic variability Associated knowledge Methodology: Train/test corpus, Cross validation, Measures (precision, recall, etc.) Regular expressions and automata (1.5h) N-Grams (4.5 h) N-grams as language models Markov assumption and probabilities of an N-gram/sentence Smoothing techniques Morphology (9) Morphology and transducers Part of speech tagging (POS) Rule-based and stochastic HMMS and Viterbi algorithm Syntax (9h) Grammars Context-free grammars Dependency grammars Probabilistic grammars Syntactic analysis Unification-based Top-down and Bottom-up Chat-parsers (Earley e CKY) Probabilistic Semantic (9h) Meaning representation Lexical semantics Thematic roles Semantic disambiguation Semantic analysis Compositional semantic analysis Statistic-based semantic analysis Classifiers and their application in semantic analysis Applications (remaining classes) Information extraction (named entity recognition, etc.) Text classification Question/answering systems Dialogue systems Machine translation Speech recognition".tokenizeAndStem();
        //bClassifierThesis.addDocument(objLN2,"Language and Information Technologies");
        bClassifierThesis.addDocument(projLN2, "Intelligent Systems");

        //Game Development Methodology - TJS
        //let objTJS = "Present a vision of the different methodologies and technologies involved in the development of digital games discussing the main features and issues in each one. Grant students with conceptual tools and techniques to develop user interfaces for games with special emphasis on player controls. Develop the ability to reflect and test the player experience and gameplay. Discuss the role of conceptual modelling and user testing. Highlight the importance to take a user centred approach in the exploration of the player experience.";
        let projTJS = "The game as an interactive artefacts Involving players in the development. Agile development. Phases of game development. Interaction models. Interface types. World and player representation. Control metaphors Conceptual modelling for player experience. Economic models and dynamics models. Playtesting in the development process. Method and techniques of data gathering and analisys. Prototyping. Level design. Gameplay/Player analytics. Adaptation to the player.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objTJS,"Games");
        bClassifierThesis.addDocument(projTJS, "Intelligent Systems");

        //Decision Support Systems
        let dss = "Introduction KDD process Pre-processing Selection, cleaning, integration and reduction Principal Component Analysis (PCA) Post-processing Evaluation. Occam's Razor and Minimum Description Length (MDL) Association Rules and Pattern Mining Apriori algorithm. Maximal and closed patterns. Sequential pattern mining - PrefixSpan algorithm Clustering K-means and EM algorithms Sequential clustering Classification Notion of concept Instance-based classification - KNN algorithm Bayesian classifiers: MAP, naive Bayes and Bayes Networks Decision trees: ID3, C4.5 and CART algorithms Neural networks: perceptron training and backpropagation algorithm Support Vector Machines Ensemble of classifiers - random forests and AdaBoost algorithm Evaluation Social Network Analysis Basic concepts: centrality and prestige. HITS algorithm. PageRank algorithm and some variants Applications Mining data streams and big data Recommender systems Text mining and information retrieval Bioinformatics and mining for healthcare Time series and temporal data mining Sentiment discovery and opinion mining".tokenizeAndStem();
        bClassifierThesis.addDocument(dss, "Intelligent Systems");

        //////////////Artificial Intelligence Technologies
        //Knowledge Engineering and Management
        let kem = "The different kinds of knowledge and the value of knowledge in organizations Knowledge repositories, their problems, techniques, representation, storage and management strategies (centralized, distributed, communities, etc). Reasons for successes and failures The use, management and exploitation of knowledge in organizations (for instance, classification, retrieval, problem solving, etc.) Knowledge disseminating techniques Knowledge Engineering Methodologies: the CommonKADS methodology, and the most important methodologies in Ontology and PSM engineering Case studies in several kinds of organizations (military, chemistry, automobile, etc.)".tokenizeAndStem();
        bClassifierThesis.addDocument(dss, "Artificial Intelligence Technologies");

        //Artificial Intelligence in Games - IAJ
        //let objIAJ = "1.\tUnderstand the differences between traditional AI and AI applied to game development, where other factors such as playability are more relevant that the oponent’s intelligence level. 2.\tBe familiar with the practical problems when developing AI for video games, and with the several techniques applied in comercial video games. 3.\tKnow how to design and build an AI system for a video game independently of its genre (action, sport, strategy, narrative).";
        let projIAJ = "1.\tIntroduction.AI in Games: the Complexity Fallacy; the kind of AI in Games; speed and memory; the AI Engine. 2.\tPathfinding: Pathfinding graph; Dijkstra; A*; Improving A*;World Representations; hierarchical pathfinding; Continuous Time Path-finding; Movement Planning. 3.\tMovement: the basics of movement algorithms; kinematic movement algorithms; steering behaviours; predicting physics; coordinated movement; motor control. 4.\tDecision making: decision trees; state machines; behavior trees; fuzzy logic; goal-based behavior; rule-based systems 5.\tAI Tactics and Strategy: waypoints tactics; tactical analysis; tactical pathfinding; coordinated actions. 6.\tLearning in games: learning basics; parameter modification; action prediction; decision learning; Naïve bayes classifier; decision trees; user modeling. 7.\tBoard Games: minimax algorithm; transposition tables; memory-enhanced test algorithms; Turn-based strategy games. 8.\tDesigning game AI: the design; shooters; driving; real-time strategy; sports; turn-based strategy. 9.\tAI and Interactive Narrative.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objIAJ,"Games");
        bClassifierThesis.addDocument(projIAJ, "Artificial Intelligence Technologies");

        //Learning and Intelligent Decision-Making - ADI
        //let objADI = "1.\tUnderstand the main issues involved in decision-making both in uncertain and in adversarial scenarios 2.\tBe familiar with the main methods for planning and learning in such scenarios";
        let projADI = "1.\tIntroduction 2.\tDecision-making in the face of uncertainty: a.\tExpected utility. Decision theory and optimization. b.\tMarkov chains. Control and observability in Markov chains. c.\tMarkov decision processes (MDPs). State and state-action value. Policy and optimal policy. d.\tValue iteration for policy evaluation. Policy iteration. Convergence. e.\tValue iteration for policy optimization. Convergence. f. Partially observable Markov decision processes (POMDPs). Beliefs. Planning in POMDPs. Point-based methods. 3.\tDecision-making in adversarial scenarios: a.\tNormal form games. Best response. Nash equilibrium. b.\tSequential games. Extended form. Stochastic games. c.\tThe computation of Nash equilibria. Complexity. 4.\tLearning: a.\tDecision theory and Bayesian inference. The Bayes optimal classifier. b.\tBayes nets. Inference in Bayes nets. The max-sum algorithm. c.\tLearning of sequential models. The forward-backward (or Baum-Welch) algorithm. Application to POMDP model learning. 5.\tLearning and decision-making: a.\tActive learning. Learning theory. b.\tOnline learning. The weighted majority algorithm. Bandits. c.\tStochastic bandits. Regret. The UCB algorithm. Regret bounds. d. Adversarial bandits. The EXP3 algorithm. Regret bounds. e.\tLearning in MDPs (reinforcement learning, RL). Model-based reinforcement learning. f.\tValue-based reinforcement learning: TD-learning and Q-learning. Convergence. 6.\tApplications: a.\tTD-Gammon: Application of RL to backgammon. b.\tBandits and planning: Monte-carlo tree search. The UCT algorithm and its application to Go.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objADI,"Intelligent Systems");
        bClassifierThesis.addDocument(projADI, "Artificial Intelligence Technologies");

        //Search and Planning - PPla
        //let objPPla = "•\tDeepen the themes of searching solutions for complex problems and planning actions. •\tIdentify the different types of problems to be solved. •\tMaster the main search methodologies and strategies. •\tSelect the methodology and strategy to apply for each problem type. •\tBe capable of solving reasonably complex search problems. •\tUnderstand the specificity of the problem of planning actions and why it needs a more powerful approach. •\tStudy the foundations and approaches to planning and be capable of solving simple planning problems.";
        let projPPla = "PART 1 – SEARCH 1.\tHEURISTICS AND PROBLEM REPRESENTATION a.\tTypes of Problems b.\tSearch Spaces versus Problem Reduction c.\tHeuristics d.\tConstructive Formulation versus Reparative Formulation e.\tSatisficing, Optimising and Semi-optimising tasks f.\tGenerate-and-Test versus Split-and-Prune paradigms g.\tSystematic Search versus Local Search 2.\tBASIC HEURISTIC SEARCH STRATEGIES a.\tLocal Search (Hill-Climbing) b.\tUninformed Systematic Search (LIFO and FIFO Strategies and AND/OR Graph Search) c.\tInformed Systematic Search (Best-First Search, BF, GBF e GBF*) d.\tSpecialised Best-First Strategies (Z*, A*, AO e AO*) e.\tHybrid Strategies 3.\tADVANCED HEURISTIC SEARCH STRATEGIES a.\tMemory-bounded strategies i.\tMinimalist strategies (IDS Uni- AND Bi-directional, IDA*, RBF and IBS) ii.\tMaximalist strategies (SMA*) MEMORY-BOUNDED STRATEGIES b.\tTime-bounded strategies i.\tQuasi-Optimal Strategies (A* with static weights and with dynamic weights, A*-epsilon) ii.\tLocal Search Advance strategies – Meta-Heuristics (Hill-climbing improved versions, Simmulated Annealing, Deterministic and Stochastic Local Beam Search, Genetic Algorithms) iii.\tNon-systematic Partial Search Strategies •\tIterative Sampling Strategies (1-samp, ISS i-samp, r-samp) •\tBounded Backtracking Search (BBS) and Multi-sampling •\tRestart Depth First Search (RDFS) •\tStochastic Iterative Breadth Search (SIB) i)\tLimited Discrepancy Search 5.\tCONSTRAINT SATISFACTION PROBLEMS a.\tFormalization i)\tConstraint graphs ii) Incremental and Complete-State Formalizations iii)\tTypes of Constraint Satisfaction Problems iv)\tUnary, binary and Global Constraints v)\tAbsolute Constraints versus Preference Constraints b.\tBacktracking Search for CSPs i)\tVariable and Value Ordering ii)\tConstraint Propagation iii)\tForward checking: Antecipation iv)\tSpecial Constraints v)\tIntelligent Backtracking c.\tLocal Search for CSPs d.\tProblem Structure 6.\tSEARCHING WITH OTHER KNOWLEDGE SOURCES a.\tSubgoals i)\tIndependent ii)\tSerialisable iii)\tNon-Serialisable iv) Block-Serialisable b.\tMacro-Operators i)\tNon-Serialisable Subgoals ii)\tArbitrary Single-Goal Search Spaces iii)\tArbitrary Search Spaces c.\tAbstraction i)\tSubset Model versus Region Model ii)\tSingle-level Abstraction iii)\tMulti-level Abstraction PART 2 – PLANNING 1. CLASSICAL PLANNING a.\tFrom Problem Search to Planning b.\tPlanning in Situation Calculus c.\tThe Planning Problem i.\tPlanning Problem Languages ii.\tRepresentation of states, goals, and actions iii.\tPreconditions and Effects iv.\tExpressivity and Extensions d. Planning by searching on a situation space i.\tTotal-order Planning ii.\tForward versus Backward Search iii.\tHeuristics e.\tPlanning by searching on a plan space i.\tPartial-order Planning ii.\tLeast-Commitment Principle iii.\tLinearizations iv.\tComponents of a partial-order plan v.\tPlanning with unassigned variables f.\tPlanning Graphs i.\tPlanning Graphs for heuristic estimation ii.\tGRAPHPLAN Algorithm iii. GRAPHPLAN Termination 2. PLANNING AND ACTING IN THE REAL WORLD a.\tTime, Schedules and Resources i.\tRepresenting temporal and resource constraints ii.\tSolving Scheduling Problems b.\tHierarchical Planning i.\tHigh-level actions ii.\tSearching primitive solutions iii.\tSearching abstract solutions c.\tPlanning and Acting in Nondeterministic Domains i.\tSensorless Planning ii.\tContingent Planning iii.\tOnline Replanning d.\tMultiagent Planning i.\tPlanning with Multiple Simultaneous Actions ii.\tPlanning with Multiple Agents: Cooperation and Coordination".tokenizeAndStem();
        //bClassifierThesis.addDocument(objPPla,"Intelligent Systems");
        bClassifierThesis.addDocument(projPPla, "Artificial Intelligence Technologies");

        //Knowledge Representation and Reasoning - RCR
        //let objRCR = "1. Give an overall view about existing advanced knowledge representation and reasoning systems (beyond First Order Logic, FOL). 2. Understand how to represent knowledge and reason in each one of these families 3. Know the advantages and disadvantages, limitations weak points of each family 4. Be able to choose the more appropriate system to a particular knowledge representation and reasoning problem. 5. Be able to build a knowledge based systems according to each family 6. Be able to represent and solve reasonably complex knowledge representation and reasoning problems. 7. Be able to represent and share large knowledge bases.";
        let projRCR = "1. Introduction: Knowledge, Representation and Reasoning. Declarative Knowledge and Procedural Knowledge. The Knowledge Representation Hypothesis. Knowledge Based Systems. The importance of representing knowledge and of reasoning with it. Soundness and Completeness. The Knowledge and Symbol Levels. 2. Some interesting applications of Knowledge Representation and Reasoning. 3. First Order Logic. Syntax, Semantics, Pragmatics. Implicit and Explicit Believes in Knowledge Based Systems in FOL. 4. Expressing Knowledge: steps to create a knowledge base in FOL. 5. Resolution: Propositional Case, Handling Variables and Quantifiers 6. Dealing with computational Intractability: FOL, Herbrand base, Propositional Logic, SAT solvers, MGU, refinements. Reasoning with Horn Clauses 7. Procedural Control of Reasoning 8. Knowledge Based Systems: definition, components, techniques, success cases, application areas in which they are appropriate, problems and limitations. Analysis of a successful expert system (for instance in medical diagnosis MYCIN - how did it work). 9. Rules in Production Systems. 10. Object Oriented Representation: key ideas. A generic system (representation and reasoning). Analysis of a particular frame system. Advanced Frame Systems (for instance, KEE): representation and reasoning. Representing knowledge in a Frame System to solve a problem. Advantages and disadvantages, problems and limitations. 11. Representing Knowledge in Description Logics. The key ideas behind Description Logics. The Boxes (T and A), intrinsic and contingent properties. A particular DL: syntax and semantics. Reasoning in DL's. Subsumption and Satisfaction. Representing a problem in DL. Classification. Beyond the Basics. Applications of DL's. 12. Semantic Web and Ontologies. Semantic Web and Ontologies. DL's and Ontologies. 13. Inheritance networks: Translational versus topological approaches. Strict and Defeasible Inheritance. Topological strategies to solve Inheritance: shortest path and inference distance. Solving Inheritance using a complete topological approach: support, specificity, preemption and redundancy. The notion of Extension. Credulous and Preferred Extension. Credulous and Skeptical Inheritance. 14. Motivation to non-monotonic logics. Reasoning by default and non-monotonicity. A non-monotonic logic, for instance Reiter's Default Logic. Default rules, default extensions, multiple extensions. Representing problems in Default Logic. Computing extensions through the syntactical system. Examples of theories with no extensions, one extension, several extensions. Interesting results for normal default theories, and for Semi-normal default theories. Advantages and disadvantages, problems and limitations. Objections to Non-Monotonic Logics 15. Uncertainty and Degrees of Belief 16. Explanation and Diagnosis.".tokenizeAndStem();
        //bClassifierThesis.addDocument(objRCR,"Intelligent Systems");
        bClassifierThesis.addDocument(projRCR, "Artificial Intelligence Technologies");

        //Social Robo`s and Human-Robot Interaction - RSIPR
        //let objRSIPR = "1.\tTo create and implement AI mechanisms that give a robotic platform the capability to interact in a social manner with humans. 2.\tBe capable of integrate and evaluate features such as intentionality, emotions, collaboration into the interaction between humans and robots in different application contexts.";
        let projRSIPR = "1.\tIntroduction 2.\tSocial Robots. Types and examples. Main characteristics. 3.\tSocial Agents architectures. Main components. Sensors and actuators for social robots. 4.\tInteraction design for social robots. Interaction through voice, language and gestures. 5. Intentionality in Robots 6.\tEmotions and emotional robots. 7.\tSocial learning. Imitation. 8.\tCollaboration between humans and robots. 9. Different application domains: manufacturing; autonomous cars; robots at home; entertainment and educational robotics. 10. Experimental design and evaluations of interaction between humans and robots".tokenizeAndStem();
        //bClassifierThesis.addDocument(objRSIPR,"Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR, "Artificial Intelligence Technologies");

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
    }

    if (type === 2) {
        bClassifierThesis = new natural.BayesClassifier();
        ///////////////////////////////////////////////////////////
        //////////////Software Engineering////////////////////////
        ///////////////////////////////////////////////////////////
        //Software Architectures - ASof
        let objASof = "Teach quality software design methods, techniques, and languages using software architecture and design pattern approaches. Study the methods and techniques that bridge the gap between the problem space and the solution space, providing traceability from system requirements to system design. Read software architectures. Evaluate software architectures. Write software architectures.";
        let progASof = "Software Architectures: The architecture influence cycle; Concepts, Quality Attributes and tactics. Documenting Software Architectures: Architectural Viewtypes and Styles; Module, Component-and-Conector, and Allocation; Context Diagrams; Combined Views; Variability and Dynamism; Choosing the Views. Evaluating Software Architectures: The ATAM Method; The CBAM Method. Software Product Families. Software Architecture Best Practices: Enterprise Architectural Patterns. Case Studies";

        bClassifierThesis.addDocument(objASof, "Software Engineering");
        bClassifierThesis.addDocument(progASof, "Software Engineering");

        //Software Specification - QS
        let objQS = "To master formal techniques for requirement specification and development of software. To understand the importance and to learn how to use tools for software verification. To use automatic tools for program verification.";
        let progQS = "Formal Software Specification using B - Requisite Specification: Representing States and Invariants. - Event-B: Primitives, Proof Obigations and Semantics. - Refinement as a software development process. - Correctness and Refinaments: Proofs of correctness as a method for verification and error detection. - Concurrency, Non-Determinism, and Distributed Systems. - Development of imperative programs. - Automatic Tools for Verification: the Rodin platform. TOOLS: http://www.event-b.org/index.html Software Specification using Alloy - Diferences between Theorem Proving and Model-Checking. - Introdution to Alloy: Sintax – Atoms, Relations and Restrictions. - Semantics: usage of Predicates and Restrictions to represent states and executions of programs. - Refinement: adding restrictions as part of the refinement process. - Satisfaction of Restrictions and Predicates as verification process. - Automatic Tools for Verification: Alloy Analyzer. - Comparison with generation of test-cases. TOOLS: http://alloy.mit.edu/alloy/ Software Verification - pi Language: Syntax and Annotations. Pre e Post-Conditions. - Substitutions as program’s state. - Safety and Liveness properties. - Induction and Ranking functions. - Correctness of Loops and Recursion. - Strategies for proving program correctness.";

        bClassifierThesis.addDocument(objQS, "Software Engineering");
        bClassifierThesis.addDocument(progQS, "Software Engineering");

        //Advanced Programming - PAva
        let objPAva = "Understand advanced programming techniques and their domain of application. Understand programming language limitations and ways to overcome those limitations. Forecast the impact of the use of advanced programming techniques in the development, execution, and maintenance of software. Understand the reflective capabilities of programming languages regarding introspection and intercession at compile-time, load-time, and execution-time. Understand the differences between programming and meta-programming and the usefulness of code models. Understand meta-classes, meta-object protocols, and their intercession capabilities. Understand aspect-oriented programming and its application to cross-cutting requirements. Understand linguistic abstraction, evaluators, and meta-circular evaluators. Understand the implementation of meta-programming, lazy-evaluation and non-deterministic evaluation.";
        let projPAva = "Reflection, introspection and intercession. Reification. Reflexive architectures. Meta-programming and code models. Reflection in Java and Javassist. Meta-object protocols. Protocols in CLOS. Generic functions and method combination. Classes and metaclasses. Protocols for making instances, for accessing instance members and for redefining classes. Aspect-oriented programming. AspectJ. Linguistic abstraction, evaluators and meta-circular evaluators. Macros. Lazy evaluation. Continuations. Direct and continuation-passing style. Non-local control transfer. Non-deterministic evaluation.";

        bClassifierThesis.addDocument(objPAva, "Software Engineering");
        bClassifierThesis.addDocument(projPAva, "Software Engineering");

        //Software Testing and Validation - TVS
        let objTVS = "As the size and complexity of software programs have grown, so has the importance of validation program correctness. A major cost in software development is its validation. There are several validation techniques. Software testing technique is one of the most widely used techniques. The Test and Validation Software (TVS) course provides advanced training in software testing, including semi-automatic and automatic manual techniques. This course also offers additional training on software validation techniques, including static analysis and model checking. It also provides contact with industrial and academic software validation tools.";
        let projTVS = "Introduction to software quality. Software testing limits. Software Testing applied to Object Oriented code. White Box Testing: Control Flow Graph; Coverage Models Black Box Testing: Testing development based on a model/specification: Method Testing Scope: Boundary value testing, Equivalence class testing, Decision-table based testing; Recursion testing; Class Testing Scope: Modal and non-modal class testing. Impact of inheritance on class testing; Subsystem Testing Scope; Integration Testing Scope: Big Bang, Top- Down , Bottom-Up, Layer, Distributed Systems Regression Testing Scope: Definition of test case selection technique. Present different selection techniques: Re-test all, risk-based, etc. System Testing Scope: Testing functional requirements; Testing non-functional requirements: Load testing, Performance testing. Automatic Generation of Testing: Test for mutation; Concolic testing; symbolic execution Static Analysis of Software: Technical static analysis; Show some existing tools. Model Checking Software: Fundamentals: temporal, restrictions logic. Algorithms for model checking; Additional Topics: Delta debugging, Code instrumentation; Invariant identification.";

        bClassifierThesis.addDocument(objTVS, "Software Engineering");
        bClassifierThesis.addDocument(projTVS, "Software Engineering");

        ///////////////////////////////////////////////////////////
        //////////////Enterprise and Information Systems////////////////////////
        ///////////////////////////////////////////////////////////

        //Information Systems Project Management - GPI
        let objGPIES = "The objectives of GPI are aligned with the same objectives as defined for the course “IS 2010.4 IS Project Management” of the curriculum “ACM/AIS IS 2010 Curriculum Guidelines”, namely: 1. Understand the concepts of project and project management in the organizational context 2. Understand the project management process groups 3. Understand and properly relate the project management processes with the different projects development lifecycles approaches 4. Make use of project scope planning methods and techniques 5. Make use of project scheduling methods and techniques 6. Identify the project stakeholders, make use of project organization and responsibilities planning methods and techniques and develop the project communication planning 7. Identify the main cost components and be capable to use cost planning methods and techniques to define the project budget 8. Make use of quality planning, quality assurance and quality control in the project management context 9. Make use of risk identification, assessment, treatment and control methods and techniques 10. Understand the procurement management processes and the management of different project contract types 11. Make use of information and tools to support project control, project close and suitable metrics 12. Identify the main Project Manager technical, behavioral and contextual competence elements 13. Understand the concepts of project based organization, change management, project value, programme management, portfolio management and governance of projects. 14. Make adequate use of MS-Project functionalities on practice exercises";
        let projGPIES = "The syllabus of GPI is closely aligned with the course \"IS 2010.4 IS Project Management\" defined in the \"ACM / AIS IS 2010 Curriculum Guidelines\" having the following main topics: 1. Project management related concepts in an organizational perspective 2. Project basics 3. Life Cycles models 4. Scope management 5. Time management 6. Project Organization and Communication management 7. Stakeholders management 8. Cost management 9. Quality management 10. Risk management 11. Procurement management 12. Project control 13. Project closure 14. Project Management competence elements 15. Projects alignment with the Organization and the Business.";

        bClassifierThesis.addDocument(objGPIES, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projGPIES, "Enterprise and Information Systems");

        //Business Process Management - ETPN
        let objETPN = "This course provides an engineering perspective on the fundamental concepts, techniques and tools associated with the business process management life-cycle. The topics addressed in this course focus on the identification, documentation, modelling, validation and verification, and optimization of organizational business processes using process analysis, design and automation techniques. The learning objectives are as follows: 1.\tUnderstand the role of business processes within and between organizations. 2.\tUnderstand the relationships and dependencies between processes, enterprise architecture and the application and technological infrastructure. 3. Analyse and design business processes using business process modelling languages. 4.\tAnalyse business processes using manual, semi-automated and automated techniques, including architectural principles and process mining. 5.\tRedesign and optimize business processes while keeping the traceability to the transformation requirements. 6.\tUnderstand the role of business process management systems (BPMS). 7.\tUnderstand the role of BPM tools, especially modelling and analysis tools.";
        let projETPN = "1.\tIntroduction to Business Process Management ACM CCS2012: Business Process Modelling, Enterprise architecture modeling 2. Process Identification ACM CCS2012: Business Process Modelling, Enterprise architecture modeling, Enterprise architecture frameworks, Reference Models 3.\tProcess Modeling ACM CCS2012: Business Process Modelling, Event-driven architectures, Business rules, Cross-organizational business processes, Enterprise architecture frameworks, Enterprise architecture modeling 4. Process Discovery ACM CCS2012: Business process modelling, Business intelligence, Business process monitoring, Business process management systems 5.\tProcess Conformance ACM CCS2012: Business intelligence, Business-IT alignment, Business process management systems 6.\tProcess Analysis ACM CCS2012: Business intelligence, Business-IT alignment, Business process management systems, Reference models 7.\tProcess Redesign ACM CCS2012: Business process modelling, Enterprise architecture modeling, Business-IT alignment, Reference Models 8.\tProcess Automation ACM CCS2012: Business process management systems, Enterprise computing, IT architectures";

        bClassifierThesis.addDocument(objETPN, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projETPN, "Enterprise and Information Systems");

        //todo descrição potencialmente em mau formato
        //Foundations of Information Systems - AOSI
        let objAOSI = "The learning objectives of Foundations of Information Systems are the subject of \"IS 2010.1 Foundations of Information Systems\" curriculum \"ACM / AIS IS 2010 Curriculum Guidelines\": 1.\tProvide a socio-technical approach to organizational information systems; understand how and why information systems are used in organizations today 2.\tExplain the relationships between the components of technology, people and organization of business information systems 3.\tKnow the main technology components of information systems 4.\tUnderstanding how businesses use information systems to support their activities and create competitive advantages 5. Understanding how information systems enable new forms of trade between individuals, organizations and governments 6.\tMeet new technologies that enable new forms of communication, collaboration and partnerships 7.\tUnderstanding how information systems enable relationships with customers and suppliers, and how they are used to strengthen the organizational structures and business processes 8.\tUnderstand how information systems can support decision making at different levels and functions of organizations 9. Understand how organizations develop and acquire technology and information systems 10.\tUnderstanding the value of investments in information systems, as well as learn how to prepare a business plan for a new information system, including estimated costs and benefits 11.\tMitigate risks, and plan and recover from disasters 12.\tUnderstand how to ensure security of information systems, taking into account both technological and human aspects 13.\tEvaluate the ethical issues of information systems, and the impact of information systems in the fraud and crime";
        let projAOSI = "The syllabus of Foundations of Information Systems is aligned with the course \"IS 2010.1 Foundations of Information Systems\" as defined in the \"ACM / AIS IS 2010 Curriculum Guidelines\". For clarification, the topics, presented below, are labelled with topics from this curriculum and also from the taxonomy of the ACM CCS 2012: 1. Enterprise Information Systems for Global Scale a.\tWhat is an enterprise information system? The role of information systems in organizations today. b.\tHow information systems are transforming business. The \"digital enterprise\". Strategic objectives of information systems. c.\tEmerging trends in information systems. Challenges and opportunities of globalization. d.\tDimensions of information systems (technology, organization and processes). Approaches to information systems: technological, behavioural, and socio-technical (the approach of this course). ACM/AIS IS 2010.1 Characteristics of the Digital World ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.1 Globalization ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems 2. E-Business and Collaboration to the Global Scale a.\tBusiness processes and information systems. b.\tTypes of business information systems. c.\tInterconnect systems for the organization. d.\tConcepts of \"e-business\", \"E-Commerce\" and \"E-Government\". e.\tCollaborative and social systems. i.\tWhat is collaboration? ii.\tWhat is \"social business\"? ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.1 The Internet and WWW > E-business ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems ACM CCS 2012 Information systems > Information systems applications > Collaborative and social computing systems and tools ACM CCS 2012 Applied computing > Electronic commerce ACM CCS 2012 Information systems > Applied computing > Computers in other domains > Computing in government > E-government 3. Information, Organizations and Systems Strategy a.\tWhat is an organization? Impact of information systems in organizations. i.\tEconomic impact ii.\tOrganizational and behavioural impact iii.\tImplications of the Internet in the design and understanding of information systems in organizations b.\tThe use of information systems for competitive advantage. i.\tCompetitive forces model of Porter ii.\tStrategies of information systems to deal with competitive forces ACM/AIS IS 2010.1 Information systems in organizations ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems ACM CCS 2012 Information systems > Information systems applications > Process control systems ACM CCS 2012 Applied computing > Enterprise Computing 4. Ethical and Social Issues in Information Systems a.\tMoral dimensions of the information society. b.\tEthics in the Information Society c.\tMoral dimensions of information systems i.\tPrivacy and freedom in the Internet age ii.\tIntellectual property ACM/AIS IS 2010.1 Information systems ethics and crime ACM CCS 2012 Security and privacy > Human and societal aspects of security and privacy ACM CCS 2012 Social and professional topics > Professional topics > Computing profession > Codes of ethics ACM CCS 2012 Social and professional topics > Computing / technology policy > Intellectual property ACM CCS 2012 Social and professional topics > Computing / technology policy > Privacy policies 5. Security and Information Systems a.\tAbuse and vulnerabilities of systems. b.\tValue of security and control c.\tA security structure and control: i.\tControls in information systems ii.\tRisk management iii.\tSecurity policies iv.\tDisaster recovery and business continuity v.\tThe role of the audits ACM/AIS IS 2010.1 Security of information systems ACM CCS 2012 Security and privacy 6. Operational excellence with enterprise applications a. Enterprise systems b.\tManagement systems in supply chains c.\tSystems for customer relationship ACM/AIS IS 2010.1 Business intelligence > Application systems ACM/AIS IS 2010.1 Enterprise-wide information systems ACM CCS 2012 Information systems > Information systems applications > Enterprise information systems 7. Electronic Commerce a.\tElectronic commerce on the Internet b. Markets and digital goods, global markets c.\tBusiness models ACM/AIS IS 2010.1 The Internet and WWW > E-business ACM CCS 2012 Applied computing > Electronic commerce 8. Knowledge Management a.\tThe value chain of knowledge management b.\tTypes of knowledge management systems c.\tContent Management Systems d.\tKnowledge management and collaboration ACM/AIS IS 2010.1 Business intelligence > Information and knowledge discovery ACM CCS 2012 Information systems > Information systems applications > Collaborative and social computing systems and tools 9. Support Decision Making a.\tBusiness intelligence in the organization b. Decision support for the operational management and middle management c.\tDecision support to executive management: balanced scorecard d.\tDecision support systems for group ACM/AIS IS 2010.1 Business intelligence > Application systems ACM/AIS IS 2010.1 Business intelligence > Information Visualization ACM CCS 2012 Information systems > Information systems applications > Decision support systems ACM CCS 2012 Information systems > Information systems applications > Data mining ACM CCS 2012 Information systems > Applied computing > Enterprise computing > Business process management > Business intelligence 10. Construction of Information Systems a.\tInformation Systems as planned organizational change b.\tAnalysis and design of systems c.\tLife cycles of systems d.\tDesign and management of business processes ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.1 Development and acquisition ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems analysis and design ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems planning ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems > Project and people management > Systems development 11. Project Management of Information Systems e.\tRunaway projects and system failure f.\tLinking systems projects to the business plan g.\tPortfolio analysis h.\tManaging project risk ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.1 Development and acquisition ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems ACM CCS 2012 Social and professional topics > Professional topics > Computing and business > Socio-technical systems 12. Management Information Systems for Global Scale a.\tThe global environment: \"business drivers\" and challenges b.\tLocation Software c.\tSystems integration on a global scale d.\tManaging global systems ACM/AIS IS 2010.1 Globalization > Global information systems strategies ACM CCS 2012 Social and professional topics > Professional topics > Management of computing and information systems ACM CCS 2012 Applied computing > Enterprise computing > Enterprise interoperability";

        bClassifierThesis.addDocument(objAOSI, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projAOSI, "Enterprise and Information Systems");

        //Enterprise Architecture - APFSI
        let objAPFSI = "1. Understand the lifecycle of enterprise engineering, including governance and processes of organizational transformation. 2. Understanding the fundamental theories underlying business engineering. 3. Understand and apply the principles of enterprise architecture. 4. Understand and use the modeling languages for enterprise architecture, especially the ArchiMate and DEMO. 5. Understanding and using models and frames of reference of organizations by industry. 6. Understand and apply the techniques of business alignment 7. Analyze case studies of real organizations";
        let projAPFSI = "1. Organizational design • organizational ontology • datalogic , infologico and ontological design . • DEMO method • DEMO language 2. Languages modeling Enterprise Architecture • overview of the ratings of Enterprise Architecture : BPMN , REA , EPC , IDEF , YAWL , UML ; • extensions of the basic model and ArchiMate . 3. Enterprise Architectural Frameworks • overview of the enterprise architecture frameworks : 2.0 FEAF , DoDAF , PEAF , IAF , BEN / St . Galen , COBIT , ITIL , IEEE 42010 , Zachman , TOGAF . 4 . Perspectives of Enterprise Architecture • views , views , and view models . • perspective of business and motivational • informational perspective • systemic perspective • infrastructural perspective 5 . Reference Models for Enterprise Architecture • Requirements of a property s Enterprise Architecture Reference Model ; • Examples of Reference Models : Telecommunications , Retail , Financial , ( TAM , eTOM , SID , PCF , SCOR ) 6 . Principles of Enterprise Architecture • standards and principles of enterprise architecture • actual examples 7 . Business representation • representation techniques • automation of business representation 8 . Methods for Enterprise Architecture • \" Business Systems Planning\" • \" Information Systems Architecture \" 9. Alignment of Enterprise Architecture • concepts and types of alignments • benchmarking and measuring alignments 10 . Concepts and Modelling of Information Architecture • informational entities • languages and techniques of information architecture 11 . Concepts of System Architecture • concepts of information systems • systems architecture in ArchiMate 12 . Service Architecture • service-oriented architecture • modeling services • methods for identifying service 13. Concepts of Technology Infrastructure • modeling infrastructure , products and technology modeling capabilities";

        bClassifierThesis.addDocument(objAPFSI, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projAPFSI, "Enterprise and Information Systems");

        //It Governance and Management - OGFI Information Systems Management
        let objOGFI = "The learning objectives are aligned with those from the course “IS 2010.7 - IS Strategy, Management & Acquisition” in the “ACM/AIS IS 2010 Curriculum Guidelines”: 1. Understand the various functions and activities within the information systems area, including the role of IT management and the CIO, structuring of IS management within an organization, and managing IS professionals within the firm. 2. View an organization through the lens of non-IT senior management in deciding how information systems enable core and supportive business processes as well as those that interface with suppliers and customers. 3. Understand the concepts of information economics at the enterprise level. 4. Appreciate how IS represents a key source of competitive advantage for firms. 5. Structure IS-related activities to maximize the business value of IS within and outside the company. 6. Understand existing and emerging information technologies, the functions of IS and its impact on the organizational operations. 7. Evaluate the issues and challenges associated with successfully and unsuccessfully incorporating IS into a firm. 8. Understand how strategic decisions are made concerning acquiring IS resources and capabilities including the ability to evaluate the different sourcing options. 9. Apply information to the needs of different industries and areas. 10. Understand the role of IT control and service management frameworks from the perspective of managing the IS function in an organization.";
        let projOGFI = "The syllabus corresponds to the course “IS 2010.7 IS Strategy, Management & Acquisition” in the “ACM/AIS IS 2010 Curriculum Guidelines”. The topics below are labeled with topics from that curriculum, as well as the ACM CCS 2012 curriculum. 1. The IS function. IS strategic alignment. ACM/AIS IS 2010.7 The IS function ACM/AIS IS 2010.7 IS strategic alignment ACM/AIS IS.ES Governance of processes and data ACM CCS 2012 Applied computing > IT governance 2. Introduction to COBIT 5. ACM/AIS IS 2010.7 The IS function ACM/AIS IS 2010.7 IS strategic alignment ACM/AIS IS.ES Governance of processes and data ACM/AIS IS 2010.3 IT control and management frameworks ACM CCS 2012 Applied computing > IT governance 3. Strategic use of information. ACM/AIS IS 2010.7 Strategic use of information ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS 2010.ES Strategic alignment ACM/AIS IS 2010.ES Governance of processes and data ACM/AIS IS 2010.ES How enterprise systems support business ACM/AIS IS 2010.INT Process of IS innovation ACM/AIS IS 2010.INT Information organization 4. Impact of IS on organizational structure and processes. ACM/AIS IS 2010.7 Impact of IS on organizational structure and processes ACM/AIS IS 2010.INT Process of IS innovation ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.ES Strategic alignment ACM/AIS IS2010.BPM Using IT for process management and improvement ACM/AIS IS.BPM Organizational issues in business process management ACM CCS 2012 Social and professional topics > Computing and business > Economic impact 5. IS economics. IS planning. ACM/AIS IS 2010.7 IS economics ACM/AIS IS 2010.7 IS planning ACM/AIS IS 2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS2010.ES Strategic alignment ACM/AIS IS2010.ES How enterprise systems support business ACM/AIS IS IS2010.INT Process of IS innovation ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change 6. Role of IS in defining and shaping competition. ACM/AIS IS 2010.7 Role of IS in defining and shaping competition ACM/AIS IS 2010.1 Information systems in organizations ACM/AIS IS 2010.6 Identification of opportunities for IT-enabled organizational change ACM/AIS IS 2010.3 Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.3 Strategic alignment ACM/AIS IS 2010.INT Process of IS innovation 7. Managing the information systems function. ACM/AIS IS 2010.7 Managing the information systems function ACM/AIS IS 2010.4 The role of IT control and service management frameworks (COBIT, ITIL, etc.) in managing the organizational IT infrastructure ACM CCS 2012 Social and professional topics > Professional topics > Computing profession 8. Financing and evaluating the performance of information technology investments and operations. ACM/AIS IS 2010.7 IS economics ACM/AIS IS 2010.7 Financing and evaluating the performance of information technology investments and operations ACM/AIS IS 2010.1 Valuing information systems ACM/AIS IS 2010.3 Total cost of ownership and return on investment ACM/AIS IS Enterprise Systems: Making the case for acquiring and implementing enterprise systems ACM/AIS IS IS Innovation and New Technologies: Economics of digital goods and services ACM CCS 2012 Social and professional topics > Management of computing and information systems > Information system economics ACM CCS 2012 Social and professional topics > Computing and business > Economic impact 9. Acquiring information technology resources and capabilities. ACM/AIS IS 2010.7 Acquiring information technology resources and capabilities ACM/AIS IS 2010.1 Development and acquisition ACM/AIS IS 2010.4 Purchasing of IT infrastructure technologies and services ACM/AIS IS 2010.6 Different approaches to implementing information systems to support business requirements ACM/AIS IS 2010.BPM Organizational issues in business process management ACM/AIS IS 2010.ES Making the case for acquiring and implementing enterprise systems ACM/AIS IS 2010.ES Selection of enterprise systems software ACM CCS 2012 Social and professional topics > Professional topics > Computing and business > Offshoring 10. IS risk management. ACM/AIS IS 2010.7 IS risk management ACM/AIS IS 2010.1 Security of information systems ACM/AIS IS 2010.3 Risk management ACM/AIS IS 2010.3 Business continuity ACM/AIS IS 2010.4 Securing IT infrastructure ACM/AIS IS 2010.4 Ensuring business continuity ACM/AIS IS.AC Information technology risks ACM/AIS IS.AC Auditing ethics, guidelines, and standards of the profession ACM/AIS IS.SRM Risk assessment frameworks ACM/AIS IS.AC Policy and management issues Gestão de Versões · Bolonha https://fenix.tecnico.ulisboa.pt/bolonhaManager/competenceCourses/... 4 de 5 18-03-2015 15:01 11. Using IS/IT governance frameworks. ACM/AIS IS 2010.7 Using IS/IT governance frameworks ACM/AIS IS 2010.4 The role of IT control and service management frameworks (COBIT, ITIL, etc.) in managing the organizational IT infrastructure ACM/AIS IS.AC Controls over information and processes ACM/AIS IS.SRM Risk assessment frameworks ACM CCS 2012 Applied computing > IT governance 12. Using IS/IT governance frameworks. ACM/AIS IS 2010.7 Using IS/IT governance frameworks ACM/AIS IS 2010.3 Audit and compliance ACM/AIS IS 2010.3 IT control and management frameworks ACM/AIS IS AC Controls Assessment ACM CCS 2012 Applied computing > IT governance";

        bClassifierThesis.addDocument(objOGFI, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projOGFI, "Enterprise and Information Systems");

        //Enterprise Systems - SEI
        let objSEI2 = "The main goal of this course is to provide a broad and in-depth view of the concepts, methodologies, and technologies associated with systems integration, including the integration of applications, services, and inter-organizational business processes. The topics addressed in this course are positioned at a key point between the application infrastructure and the business processes in an organization, and the aim is to understand the relationships and dependencies between the two. The course will also provide insight into how it is possible to devise a distributed and integrated application infrastructure. The concrete learning objectives are as follows: 1. To provide an in-depth view of the main concepts and integration solutions in the field of integration; 2. To develop a systematic and process-oriented vision of how integration problems should be addressed; 3. To acquire a practical knowledge of the state-of-the-art integration platforms, based on lab projects; 4. To understand the critical role that integration solutions have in the design and implementation of business processes.";
        let projSEI2 = "The course aims at providing a coherent structure of integration topics that can be found in different parts of the ACM/AIS IS 2010 curriculum, such as “Enterprise Systems” and “Application Development”. When appropriate, this syllabus is labeled with topics from that curiculum and also from the ACM CCS 2012 taxonomy: 1. Evolution of information systems a. essential functions of information systems in business organizations; b. evolution of information systems architecture over the years; point-to-point vs. centralized integration; c. integration based on the concept of service. ACM/AIS IS 2010.1 Information Systems in Organizations ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise Information Systems 2. Introduction to integration platforms a. message exchange; b. message schema and transformation; c. ports and adapters; d. orchestrations; e. business rules. ACM/AIS IS 2010.3 Systems Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Data exchange; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Service buses; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Enterprise application integration tools; ACM CCS 2012 Applied Computing > Enterprise Computing > Business rules 3. Messaging systems a. fundamental concepts; b. message transactions; c. message acknowledgments; d. message correlation; e. messaging platforms. ACM/AIS IS 2010.AD Application Integration ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise interoperability > Enterprise application integration; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Distributed transaction monitors; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Message queues 4. Message brokers a. message-level integration vs. orchestration-level integration; b. publish-subscribe with message filters; c. message properties; d. message correlation; e. asynchronous messaging. ACM/AIS IS 2010.AD Application Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Mediators and Data Integration; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers 5. Adapters a. three-tier client-server model; b. capture of the user interface; c. integration through files; d. database access APIs; e. retrieving data in XML; f. data access in orchestrations; g. methods and interfaces; h. interface discovery and dynamic invocations; i. Web service invocation in orchestrations. ACM/AIS IS 2010.3 Data Integration ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Data exchange; ACM CCS 2012 Information Systems > Data Management Systems > Information Integration > Mediators and Data Integration ACM CCS 2012 Information Systems > World Wide Web > Web services ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers 6. Services and SOA a. services and applications; b. service composition; c. service orchestration; d. business processes; e. service design principles; f. benefits of SOA; g. support for human workflows. ACM/AIS IS 2010.3 Service oriented architecture ACM CCS 2012 Applied Computing > Enterprise Computing > Service-oriented architectures; ACM CCS 2012 Applied Computing > Enterprise Computing > Business process management > Business process management systems 7. Service orchestrations a. block structure; b. beginning the flow; c. message construction; d. flow control with loops, decisions, and parallelism; e. orchestrations as sub-processes; f. concurrent events; g. correlations; h. exception handling; i. transactions and compensation. ACM/AIS IS 2010.ES Business process integration ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Enterprise application integration tools; ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Middleware business process managers ACM CCS 2012 Information Systems > Data Management Systems > Middleware for databases > Distributed transaction monitors 8. Inter-organizational integration a. electronic data exchange; b. introduction to supply chain management; c. supply chain coordination; d. electronic commerce; e. negotiation protocols. ACM/AIS IS 2010.1 Supply Chain Management ACM/AIS IS 2010.ES Production logistics ACM CCS 2012 Information Systems > World Wide Web > Web applications > Electronic commerce > Electronic data interchange; ACM CCS 2012 Applied Computing > Enterprise Computing > Business process management > Cross-organizational business processes 9. Internet of things a. physical world and virtual world integration; b. traceability systems; c. sensors and complex event processing; d. logistics systems based on RFID. ACM/AIS IS 2010.ES Enterprise Systems > Production logistics ACM CCS 2012 Applied Computing > Enterprise Computing > Enterprise computing > Event-driven architectures ACM CCS 2012 Information systems > Information systems applications > Spatial-temporal systems > Data streaming";

        bClassifierThesis.addDocument(objSEI2, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projSEI2, "Enterprise and Information Systems");


        let objAGIIT = "To understand the differences and similarities between the fundamental components of an IT solution 2. To understand how IT components should be organized in different organizational environments 3.\tTo understand the principles underlying the virtualization of IT services 4.\tTo configure a small scale IT solution, including servers, data storage, network, security appliances and clients 5.\tTo understand the architecture and tradeoffs involved in the design and management of an IT solution for large scale organizational environments 6.\tTo understand the role of service control and management environments in the management of large scale IT infrastructures 7.\tTo understand the opportunities that dynamic provisioning infrastructures, such as cloud computing platforms, create for organizations 8.\tTo analyze and to assess the implications on the design of IT infrastructures of existing security and business continuity solutions 9.\tTo minimize the impact of IT solutions on the environment and on resource depletion";
        let progAGIIT = "1.\tPhysical infrastructures a.\tGreen computing; b.\tEnergy management; c.\tPhysical security & safety; d.\tInfrastructure standards; e. Redundancy; f.\tConstruction and relocation of data centers. 2.\tStorage a.\tArchitecture and technologies of a storage system; b.\tSAN, NAS, DAS; c.\tVirtual disks; d.\tRAID; e.\tSynchronization of distributed storage systems; f.\tData storage lifecycle management. 3. Servers a.\tServer architecture; b.\tBlade servers; c.\tVirtual servers and server consolidation; d.\tPerformance evaluation; e.\tServer clusters; f.\tSupercomputers. 4.\tNetworks a.\tData center network architecture; b.\tTypes of networks and network devices; c.\tSecurity architecture and policies; d.\tSoftware defined networks. 5.\tAdministration a.\tTools; b.\tScripting; c.\tWindows and Linux servers; d. Software installation and update; e.\tBackups; f.\tVirtual desktop; g.\tSupport and maintenance; h.\tAdministration domains; i.\tSecurity and access control mechanisms; 6.\tManagement a.\tManagement and governance standards; b.\tManagement best practices (ITIL); c. Audits and certifications; d.\tConfiguration management databases; e.\tAcquisition, sourcing and assessment; f.\tIT service management; g.\tContinuity management; h.\tAvailability and capacity management; i.\tProblem and incident management; j.\tConfiguration and change management. 7.\tIT platforms a.\tIT platform models; b.\tVirtual data centers; c.\tSoftware defined data centers; d.\tSaaS, PaaS, IaaS; e. Integration of distributed IT platforms; f.\tDisaster recovery data centers; g.\tAutonomic computing; h.\tIT platform management automation.";

        bClassifierThesis.addDocument(objAGIIT, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(progAGIIT, "Enterprise and Information Systems");

        //Engineering of Large Scale Systems
        let DDRS = "Performance and scalability are key factors to the success of Internet services such as those provided by Google, Amazon, Microsoft, Facebook or Netflix. The goal of this course is to equip students with the ability to reason about performance and scalability in large scale systems in general, and in cloud-based systems in particular. Students will learn to identify scalability limitations and system bottlenecks, by monitoring and modelling system behaviour. Students will also learn how to properly design benchmarks and simulations and how to interpret results through appropriate data representation. Equipped with these skills, students will be able to design scalable systems with good performance running in cloud platforms and enhance existing systems. Students will exercise these skills through concrete cases studies that will exploit Machine Learning, resource heterogeneity, and other techniques to predict future behaviour, perform capacity planning, and develop self-adapting systems. By the end of the course, students should be able to: ● Engineer systems for performance and scalability ●\tDesign benchmarks to correctly assess system behaviour under different workloads ●\tMeasure, identify and address system bottlenecks ●\tPredict future system behaviour for capacity planning ●\tSimulate new systems to assess their behaviour before implementation and simulate existing systems to assess impact of potential changes.";
        let DDRSA = "1 - Introduction (2 classes) - Introduction, challenges and common mistakes - Overview of a cloud-based system - Performance and scalability challenges in NoSQL Cloud data stores - Performance and scalability challenges in Network Virtual Functions (NVF) 2- System Scalability (2 classes) - Fundamental Concepts of Scaling: Scalability, Efficiency and Elasticity - Aspects limiting system scalability: - Contention: relation and impact of Amdahl's Law - Coherence: relation and impact of Universal Scalability Model 3 - System Performance (5 classes) - System properties, throughput, latency, jitter, useful work - Concurrency, queueing and overload - Bottleneck identification - Design for performance: batching, queueing, dallying, speculation, scheduling 4 - Simulation (3 classes) - Discrete event simulation - Event set structures - Simulation verification and validation - Replications and stop conditions 5 - Benchmarking and capacity planning (5 classes) - Benchmarking, macro and micro benchmarking - Workload selection and design - Metrics and metrics representation - Scalability parameters - Evaluation factors and techniques - Capacity planning 6- Self-Adapting systems (4 classes) -\tProperties of self-adapting systems -\tAutonomic operation and reconfiguration -\tRole of Machine Learning in modern self-adapting systems -\tAutomated configuration discovery -\tAdaptation policies 7 - Case studies (2 classes) - Exploiting heterogeneity for improving NoSQL database performance - Performance prediction using Machine Learning - Capacity planning and self-adapting systems";

        bClassifierThesis.addDocument(DDRS, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(DDRSA, "Enterprise and Information Systems");

        //Data Administration in Information Systems - AOBD
        let objAOBD = "The course on Data Administration in Information Systems aims at providing to students the skills needed to manage, optimize and effectively use modern database systems for managing large volumes of data. Students should be able to: 1. understand the internal mechanisms of a relational Database Management System (DBMS),, including storage management, indexing, processing and optimizing queries, transaction management, concurrency control, and recovery management 2. understand the tasks involved in database administration 3. optimize information access in databases that store very large amounts of data 4. acquire basic knowledge about the various architectures of parallel and distributed databases, including conventional (SQL) and unconventional (NoSQL) database systems.";
        let projAOBD = "The course syllabus for Data Administration in Information Systems mostly includes topics from the Information Management (IM) area in the ACM CS 2013 Curriculum. The course topics, which are presented next, are labeled with the topics from this curriculum, and with the topics from the ACM CCS 2012 taxonomy, for further clarification: 1. Storage (sub-)systems a. Storage technologies (e.g., RAID) b. Replication c. Architectures ACM CS IM/Database Systems > Components of database systems ACM CS IM/Physical Database Design > Storage and file structure ACM CCS 2012 Information systems > Information storage systems > Information storage technologies 2. Indexing algorithms and file organization a. Record storage b. Buffer management c. Data access ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Indexing ACM CCS 2012 Information systems > Information storage systems > Record storage systems ACM CCS 2012 Information systems > Database management system engines > Record and buffer management 3. Query processing a. Query execution planning b. Algorithms c. Optimization ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CCS 2012 Information systems > Database management system engines > Database query processing 4. Concurrency control a. Locking protocols b. Timestamping protocols c. Multi-version protocols ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Transaction Processing > Concurrency control ACM CCS 2012 Information systems > Database management system engines > Database transaction processing 5. Data recovery a. Logging b. Failure of non-volatile storage c. Backups ACM CS IM/Database Systems > Components of database systems ACM CS IM/Database Systems > Design of core DBMS functions ACM CS IM/Transaction Processing > Failure and recovery ACM CCS 2012 Information systems > Database management system engines > Database transaction processing > Database recovery 6. Database optimization a. Schema-level optimization b. Query optimization ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CCS 2012 Information systems > Database management system engines > Database query processing ACM CCS 2012 Information systems > Database design and models > Relational database model ACM CCS 2012 Information systems > Data structures > Data access methods 7. Index optimization a. Clustering b. Covering indexes ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CS IM/Indexing ACM CCS 2012 Information systems > Information storage systems > Record storage systems > Record storage alternatives ACM CCS 2012 Information systems > Information storage systems > Record storage systems > Directory structures 8. Optimizing the hardware and the operating systems a. Threads, buffers and storage b. Database performance ACM CS IM/Physical Database Design > Database efficiency and tuning ACM CS IM/Transaction Processing > Interaction of transaction management with storage, especially buffering ACM CCS 2012 Information systems > Database management system engines > Record and buffer management ACM CCS 2012 Information systems > Database administration > Database performance evaluation 9. Parallel and distributed databases a. Architectures b. Partitioning c. Algorithms d. Systems based on map-reduce ACM CS IM/Database Systems > Approaches for managing large volumes of data ACM CS IM/Distributed Databases ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > Relational parallel and distributed DBMSs ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > MapReduce-based systems 10. NoSQL databases a. Key-value storage databases b. Document databases c. Column-oriented databases d. Databases for graph data ACM CS IM/Database Systems > Approaches for managing large volumes of data ACM CCS 2012 Information systems > Database management system engines > Parallel and distributed DBMSs > Key-value stores ACM CCS 2012 Information systems > Information retrieval";

        bClassifierThesis.addDocument(objAOBD, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(projAOBD, "Enterprise and Information Systems");

        //Data Analysis and Integration - GTI
        let objGTI2 = "The course on Data Analysis and Integration aims at teaching the students the most important concepts of data integration according to two different perspectives: virtual data integration, where the data sources can be accessed through a mediator-based architecture; and materialized data integration, where a materialized data repository (named data warehouse) is populated with data coming from the data sources. Additionally, the course will teach techniques that can be used to exploit information: OLAP (On-line Analytical Processing) and reporting in a warehoused architecture, and mash-up systems in a virtual architecture. The data integration processes aim at supplying, among other applications, a uniform view over a set of autonomous and heterogeneous data sources, making it easy the access to source data for analysis and visualization purposes. Their application domains are diverse, ranging from the Business Intelligence systems to scientific research systems (e.g., Bioinformatics).";
        let progGTI2 = "The course syllabus for Data Analysis and Integration includes mostly topics from the Information Management (IM) " +
            "area in the ACM/IEEE CS 2013 Curriculum. The course topics, which are presented next, are labeled with the topics from this" +
            " curriculum, and with the topics from the ACM CCS 2012 taxonomy, for further clarification: 1.tMain challenges of data " +
            "integration processes; data integration paradigms. Heterogeneous data sources: XML data management and processing. Declarative and navigational queries, Information M" +
            "anagement Concepts, Information capture and representation, Data Modelling, Semi-structured data model, information systems, data management systems";

        bClassifierThesis.addDocument(objGTI2, "Enterprise and Information Systems");
        bClassifierThesis.addDocument(progGTI2, "Enterprise and Information Systems");

        ///////////////////////////////////////////////////////////
        //////////////Distributed and Cyberphysical Systems///////////////////////
        ///////////////////////////////////////////////////////////

        //Design and Implementation of Distributed Applications
        let objPADIDS = "Understand the system level problems underlying the design and development of large-scale applications. Learn the existing solutions concerning the middleware for large-scale applications with emphasis on the models and architectures taking into account non-functional requirements (scalability, performance, etc.). Specify, design, analyse and implement large scale distributed applications as well as its underlying middleware.";
        let projPADIDS = "Part I: System Models System models Synchronous vs asynchronous systems. Message passing vs shared memory. Fault-models. Consistency models and the CAP theorem. System scales: Client server Clusters and Grid Computing Cloud Computing Peer to peer Part II: Abstractions Distributed Coordination: Physical clocks and clock synchronization Logical time and logical clocks Vector clocks Global states and distributed snapshots Mutual exclusion Leader election Distributed agreement Reliable multicast Total order Consensus Group communication and virtual synchrony Distributed transaction processing Concurrency control Distributed atomic commitment Part III: Systems Building large reliable systems Replicated File-systems Lazy replication Peer-to-peer systems. Geo-replicated systems The google case-study";

        bClassifierThesis.addDocument(objPADIDS, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projPADIDS, "Distributed and Cyberphysical Systems");

        //Internet of Things Interaction Design
        let objIOT2 = "Students should be able to: Understand how Internet of Things (IoT) Interaction Design differs from traditional disciplines of Human-Computer Interaction (HCI); Think beyond “brick” devices (e.g. phones, tablets) to IoT environments and new interaction modalities; Apply Interaction Design techniques to ideate and prototype novel IoT concepts; Gain skills in developing interactive prototypes that combine software and hardware in new ways; Gain a foundation of contemporary and classic research in the fields of Interaction Design and Ubiquitous Computing; Understand challenges in evaluating the user experience of IoT-based systems and environments.";
        let projIOT2 = "1.\tInteraction Design and the Internet of Things a.\tWhat is Interaction Design b.\tWho creates Interaction Design c.\tWhat is the Internet of Things d.\tChallenges of designing for IoT Experiences 2.\tTechniques for Designing User Experiences a.\tSketching b.\tThe design funnel c.\tSketching with templates and foam core d.\tCreating sequential and narrative storyboards e.\tUser research techniques: Uncoverting the mental model, Wizard of Oz, and Think Aloud 3.\tPrototyping tools for the Internet of Things a.\tArduino for interactive objects b.\tKinect sensors for interactive spaces 4.\tDisciplines of Human-Computer Interaction within the Internet of Things a.\tTangible interaction b.\tWearable interaction c.\tContext-aware environments 5.\tInput and Output Technologies for IoT a.\tTouchscreens, from smartwatches to wall displays b.\tVoice interaction c.\t3D gestures d.\tOther input modalities from accoustic input to brain signals e. Audio output f.\tHaptic feedback, from vibrotactile to muscle-propelled feedback g.\tOther output modalities 6.\tEvaluating User Experience of IoT systems a.\tChallenges b.\tResearch methods c.\tQualitative and Quantitative analysis";

        bClassifierThesis.addDocument(objIOT2, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projIOT2, "Distributed and Cyberphysical Systems");

        //Applications and Computation for the Internet of Things
        let objIOT = "Students should be able to design, develop, integrate and test cyber-physical systems for the Internet of Things (IoT) with a focus on the requirements and restrictions of cyber-physical interfacing and related software. To study the control and evaluation of cyber-physical interfaces, system-software architectures, and common design patterns; design and performance evaluation of constrained systems (power, memory). Relevant case studies: widespread technologies (identification based on smart cards and tags and biometrics); widespread devices (sensors in smartphones).";
        let progIIOT = "1.\tCharacteristics of cyber-physical systems in the IoT: requirements, life cycle, economy. 2.\tInput/Output interface and devices. Modes of service. Interfacing the physical world – cyber-physical interfaces (logical interaction with sensors and actuators). Performance evaluation (latency, bandwidth, precision, resolution). 3.\tSystem-software architectures – Run-time platforms: Round robin, function-queue scheduling, multitasking; preemption, scheduling (RMS, EDF). Performance evaluation: workload, latency, reliability. 4.\tSoftware design patterns. Non-functional requirements: execution time, energy management, memory usage. 5.\tReal-time systems. 6.\tFault tolerance. 7.\tDesign and development of embedded systems. System specification. Development and life cycles. 8. Case studies: widespread technologies – electronic identification (smart cards and tags) and biometrics; widespread devices (sensors in smartphones). 9.\tAdvanced topics: Co-design, sensor networks. 10.\tSeminar.";

        bClassifierThesis.addDocument(objIOT, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(progIIOT, "Distributed and Cyberphysical Systems");

        //Mobile and Ubiquitous Computing - CMov
        let objCMov = "Understand the fundamental challenges and problems underlying the design and development of software (middleware and operating system) supporting applications for mobile and ubiquitous scenarios (users, hardware, software). Design, specify, analyse and implement software systems (mobile/ubiquitous middleware and operating system) that can support mobile/ubiquitous applications.";
        let projCMov = "Introduction. Fundamental challenges and problems of mobile and ubiquitous computing. Replication (caching, staging, hoarding), consistency and synchronization. Resource discovery and usage (cyberforaging). Mobility, location, context-awareness and adaptability. Battery consumption. Security. Communication, ad-hoc and sensor networks. Mobile code, mobile agents. Middleware and examples of applications, architecture of applications (Android).";

        bClassifierThesis.addDocument(objCMov, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projCMov, "Distributed and Cyberphysical Systems");

        //Parallel and Distributed Computing - CPD
        let objCPDDS = "Understanding the models, techniques, and programming methods for parallel algorithms. Analyzing and designing parallel algorithms. Understanding the foundations of distributed computing.";
        let projCPDDS = "Parallel computing models: multiprocessors and multicomputers. Memory organization; communication complexity. Interconnection networks. Flynn’s taxonomy. Programming message-passing systems: MPI. Programming shared memory systems: OpenMP, threads, race conditions, deadlock detection. Analysis and synthesis of parallel algorithms: problem partitioning; data organization; synchronization; balancing and scheduling. Performance analysis for parallel algorithms. Foundations of distributed computing and their applications to parallel algorithms. Limits of parallel computing. Analysis of parallel algorithms: sorting algorithms; numerical algorithms, matrix multiplication, solving systems of linear equations; algorithms on graphs; search and optimization algorithms.";

        bClassifierThesis.addDocument(objCPDDS, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projCPDDS, "Distributed and Cyberphysical Systems");

        //Ambient Intelligence - AI
        let objAI = "•\tunderstand the concept of Ambient Intelligence and be aware of the multiple fields where it can be applied; •\trecognize the importance of having sensitive and responsive environments that react accordingly to the presence and preferences of people; •\tbe introduced to different technologies that are applied in this field and be aware of the main challenges regarding power consumption, communication, security, reliability, interface with sensors and actuators and interface with people. •\tlearn about three specific application areas: smart homes/home automation and intelligent buildings, wireless sensor and actuator networks, and intelligent mobility systems; •\tbe aware of different energy management policies, in the field of home/building automation, keeping focus on the user requirements and preferences; •\tbe able to understand, define the requirements and address the implementation of a system that monitors an environment and reacts to different events and to the profile of the people present.";
        let projAI = "Motivation: vision of future interfaces. Main problems: energy consumption, communication, security, reliability. Typical architecture: sensors/actuators; processor; memory; radio communication; digital system. Variety of sensors and actuators. Communication networks. Home automation: objectives and benefits. Functions and application areas. System architectures. Protocols and common means of communication. Study of the X10 technology: architecture, protocol, module examples, X10 controllers. Study of the EIB/KNX technology: architecture, protocol, communication means, module examples, interoperation mechanisms, design and deployment. Intelligent transport systems. Objectives: environment, security, comfort. Environment and human conditions for deployment. Detection, localization and object identification. Mobile and local communications. Data management: public information; mobility management. Application cases. Sensor networks. Application cases: detection of forest fires; early detection of earthquakes; environment monitoring; monitoring of people and animals. Issues: energy consumption and energy harvesting; synchronization; communication protocols. Estimation and data aggregation.";

        bClassifierThesis.addDocument(objAI, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projAI, "Distributed and Cyberphysical Systems");

        //Highly Dependable Systems - SDTF
        let objSDTFC = "To provide an integrated perspective of dependable computing, addressing the mechanisms required to tolerate different types of faults, from accidental to malicious faults, including intrusions. The course addresses the security and fault-tolerant aspects of the system design.";
        let projSDTFC = "1) Dependability fundamentals a) Taxonomy (fault, error, failure) b) Reliability, availability, maintainability, safety, security c) Fault assumption and coverage d) Space, Time, and Value redundancy. Coding. Triple Modular Redundancy e) Error processing. Backward and forward recovery. f) Failure detection and system diagnosis. Watchdogs 2) Secure Hardware a) Security devices b) Smartcards c) Trusted Platform Module d) Biometric Systems 3) Securing the system a) Physical security b) Physical protection of systems c) Intrusion tolerance 4) Byzantine fault tolerance a) Byzantine Leader Election b) Byzantine Broadcast c) Byzantine Memory d) Byzantine Consensus e) Byzantine Replicated State Machines 5) Human Factors a) Human factors in security b) Social engineering";

        bClassifierThesis.addDocument(objSDTFC, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projSDTFC, "Distributed and Cyberphysical Systems");

        //Cloud Computing and Virtualization - AVExe
        let objAVExe = "Attain an integrated perspective of cloud computing and virtualization, with combined approaches for the design of modern large scale and distributed computing systems, and with their underlying mechanisms and algorithms. Understand a vertical approach to the various virtualization and cloud computing technologies, enhancing applications and services with improved flexibility, resource and economic efficiency, scalability and adaptability. To be able to develop reliable and scalable systems and applications, on cloud computing over current virtualization platforms and applications models. To be able to assess and evaluate solutions, given the alternatives and tradeoffs involved in the employment and management of virtualization infrastructure for cloud computing.";
        let projAVExe = "Introduction to Virtualization and Cloud Computing, Infrastructure-as-a-Service, Platform-as-a-Service, Software-as-a-Service. System-level virtualization: system VM architecture, CPU virtualization, OS core, memory, I/O; hardware support for virtualization, case studies (VMWare, QEMU/KVM, Xen). Cloud computing systems (Amazon EC2, OpenStack, XenCloud, OpenNebula); VM scheduling, migration and replication; monitoring and scalability (CloudWatch, Autoscaling). Process-level virtualization: Java VM specification and reference implementation, security model, code management and binary translation, just-in-time compilation and optimization, garbage collection, case studies (Jikes RVM). Cloud computing platforms (Azure, Google App Engine); distributed virtual machines; monitoring and scalability (Azure Fabric Controller). Data and Storage services: block storage, file storage, key-value stores (Dynamo, S3, Datastore), tabular storage (BigTable, Percolator). Cloud computing scalability: Map-reduce, dataflows (Pig, Dryad, OOzie), streams (S4), applications, monitoring, elasticity and optimization. Cloud computing cross-cutting concerns: virtualization energy efficiency, dynamic provisioning, energy centered cloud design.";

        bClassifierThesis.addDocument(objAVExe, "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument(projAVExe, "Distributed and Cyberphysical Systems");

        ///////////////////////////////////////////////////////////
        /////////////Interaction and Visualization///////////////////////
        ///////////////////////////////////////////////////////////

        //Three-Dimensional Vizualization and Animation - AVT
        let objAVT = "This course introduces design and development techniques for 3D real-time interactive applications by using graphic APIs such as Modern OpenGL and WebGL. It includes the development of an immersive 3D game for mobile devices by using a low-cost VR glasses set. The course covers also the latest advances in GPU technology and their applications to simulation and computer games. Students should be able to describe and justify methods, procedures and example systems used in Real-Time Interactive Virtual Environments, by identifying the underlying terms, concepts and base principles.";
        let projAVT = "Real-Time Image Synthesis, 3D Viewing Pipeline (Modern OpenGL and WebGL), GLSL Shading language programming, Scenes description formats, 3D Geometric Transformations; Visual Appearance: advanced Lighting and Texturing (Bump mapping and Environmental mapping); Collision Detection, Special visual effects: lens flare, stencil, billboards, particle systems; Stereoscopic effect; Acceleration Techniques for games and simulators";

        bClassifierThesis.addDocument(objAVT, "Interaction and Visualization");
        bClassifierThesis.addDocument(projAVT, "Interaction and Visualization");

        //User Centered Design - CCU
        let objCCU = "Understand the basic principles and the methodologies of interactive systems user centred design. Understand users and their needs, how to really acquire them, and the need of user involvement in interactive systems design and implementation. Adapt the above knowledge to user centered design methodologies. Design and implement an interactive system involving real users at various levels in light of the above.";
        let projCCU = "Lectures: Introduction to User Centered Design. Users and Stakeholders. Inquiring Users and Experts. Observing Users. User Involvement and Participation. User Needs and Requirements. Usability Engineering. Data Analysis and Interpretation. Building Prototypes. Interface Types. Affective Aspects. Accessibility. Ethics in User Centered Design. Laboratory: Workshops with the following themes: Who are the Users? What the Users want? Applying Cultural Probes Workshops with Users Initial Requirements Validation of Requirements Conceptual Model and First Low Fidelity Prototypes. Usability Testing. Low Fidelity Prototypes. Functional Prototype.";

        bClassifierThesis.addDocument(objCCU, "Interaction and Visualization");
        bClassifierThesis.addDocument(projCCU, "Interaction and Visualization");

        //Information Visualization - VI
        let objVI = "This course introduces design and development techniques for 3D real-time interactive applications by using graphic APIs such as Modern OpenGL and WebGL. It includes the development of an immersive 3D game for mobile devices by using a low-cost VR glasses set. The course covers also the latest advances in GPU technology and their applications to simulation and computer games. Students should be able to describe and justify methods, procedures and example systems used in Real-Time Interactive Virtual Environments, by identifying the underlying terms, concepts and base principles.";
        let projVI = "Real-Time Image Synthesis, 3D Viewing Pipeline (Modern OpenGL and WebGL), GLSL Shading language programming, Scenes description formats, 3D Geometric Transformations; Visual Appearance: advanced Lighting and Texturing (Bump mapping and Environmental mapping); Collision Detection, Special visual effects: lens flare, stencil, billboards, particle systems; Stereoscopic effect; Acceleration Techniques for games and simulators";

        bClassifierThesis.addDocument(objVI, "Interaction and Visualization");
        bClassifierThesis.addDocument(projVI, "Interaction and Visualization");

        //Interactive Visual Communication - CVI
        let objCVI = "The goal is to provide students with knowledge and competencies needed for the effective communication of concepts, trneds and information based on interactive graphic applications. We’ll describe the relevant specificities of different data types that can be used to communicate, and the best way of using and combining them towards that end. Next, we’ll teach metadata and descriptor extraction techniques from the different media, with an emphasis in images, thus allowing their more efficient manipulation and usage. Indexing and retrieving media based on that metadata will be studied next. Possessing the data in an easy to use format, students will then learn how to visually represent and explore them, interactively. Finally, we’ll approach the question of how best to present concepts, trends and information with the creation of public multimedia presentations, maximizing their impact and the amount of information apprehended by the audience.";
        let projCVI = "1.\tIntroduction 2.\tImages and other Media 3.\tMetadata and Content Information 4.\tThe special case of personal information: PIM and Lifelogging 5.\tFeature Extraction and Indexing 6.\tRetrieval evaluation 7.\tGraphic design principles 8.\tHuman Factors 9. Communicating with data 10.\tPhotography, Video and Animations 11.\tMultimedia Presentations";

        bClassifierThesis.addDocument(objCVI, "Interaction and Visualization");
        bClassifierThesis.addDocument(projCVI, "Interaction and Visualization");

        //Multimedia Content Production - PCM
        let objPCM = "Know the different types of multimédia information and how to manipulate them to poduce multimedia content. To understand the technological constraints that affect Production. To understand critical factors affect the success of a production, namely in aspects such as capture, encoding, processing and visualization of the different media. To know the different kinds of available authoring tools. To create Multimedia contents; To identify the different contexts in which multimedia can be consumed, with emphasys on online and network issues (evaluate bandwidth, latency, synchronization, etc.) and mobile devices. Introduce some advanged multimedia usages such as procedural modelling, generative art augmented reality. Apply efficient methods of multimedia content retrieval.";
        let projPCM = "1.\tMultimedia Data Types a.\tText b.\tBitmap Images c.\tVector Images and SVG d.\tSound e.\tVideo f.\tAnimations 2.\tProcessing and Visualization of multimedia signals 3.\tCapture and encoding of multimedia information 4.\tMultimedia design principles 5.\tLinear and Non-Linear edition of audio and video 6.\tSynchronization 7.\tScripting languages and interactive applications 8.\tMultimedia and networks 9.\tMobile multimedia 10.\tAdvanced multimédia applications 11.\tContent-based multimedia retrieval 12.\tMultimédia databases";

        bClassifierThesis.addDocument(objPCM, "Interaction and Visualization");
        bClassifierThesis.addDocument(projPCM, "Interaction and Visualization");

        //3d Programming - PSJ
        let objPSJ = "This course introduces the concepts and theory of a modern photorealistic rendering. Through the ideas and software in this course, the students will learn to design and develop a rendering system for creating stunning imagery. It covers also the development of a Unity 3D-based application by using its Assets library and the built-in shaders for photorealistic appearance.";
        let projPSJ = "Rendering Equation, Photorealistic Rendering and the Ray-Tracing Algorithm, Geometry Intersection techniques, Acceleration Structures: Grids, KD-Trees and Bounding-Volumes Hierarchy; Materials, Monte Carlo Integration, BRDF and Light Sampling, Combined Sampling & Path Tracing, Photon Mapping, Unity 3D game engine: GUI, game objects and components, lights, materials, rigid bodies, scripting, input and character control, cameras, prefabs, colliders, triggers and shaders.";

        bClassifierThesis.addDocument(objPSJ, "Interaction and Visualization");
        bClassifierThesis.addDocument(projPSJ, "Interaction and Visualization");


        ///////////////////////////////////////////////////////////
        /////////////Intelligent Systems///////////////////////
        ///////////////////////////////////////////////////////////

        //Search and Planning - PPla
        let objPPla = "•\tDeepen the themes of searching solutions for complex problems and planning actions. •\tIdentify the different types of problems to be solved. •\tMaster the main search methodologies and strategies. •\tSelect the methodology and strategy to apply for each problem type. •\tBe capable of solving reasonably complex search problems. •\tUnderstand the specificity of the problem of planning actions and why it needs a more powerful approach. •\tStudy the foundations and approaches to planning and be capable of solving simple planning problems.";
        let projPPla = "PART 1 – SEARCH 1.\tHEURISTICS AND PROBLEM REPRESENTATION a.\tTypes of Problems b.\tSearch Spaces versus Problem Reduction c.\tHeuristics d.\tConstructive Formulation versus Reparative Formulation e.\tSatisficing, Optimising and Semi-optimising tasks f.\tGenerate-and-Test versus Split-and-Prune paradigms g.\tSystematic Search versus Local Search 2.\tBASIC HEURISTIC SEARCH STRATEGIES a.\tLocal Search (Hill-Climbing) b.\tUninformed Systematic Search (LIFO and FIFO Strategies and AND/OR Graph Search) c.\tInformed Systematic Search (Best-First Search, BF, GBF e GBF*) d.\tSpecialised Best-First Strategies (Z*, A*, AO e AO*) e.\tHybrid Strategies 3.\tADVANCED HEURISTIC SEARCH STRATEGIES a.\tMemory-bounded strategies i.\tMinimalist strategies (IDS Uni- AND Bi-directional, IDA*, RBF and IBS) ii.\tMaximalist strategies (SMA*) MEMORY-BOUNDED STRATEGIES b.\tTime-bounded strategies i.\tQuasi-Optimal Strategies (A* with static weights and with dynamic weights, A*-epsilon) ii.\tLocal Search Advance strategies – Meta-Heuristics (Hill-climbing improved versions, Simmulated Annealing, Deterministic and Stochastic Local Beam Search, Genetic Algorithms) iii.\tNon-systematic Partial Search Strategies •\tIterative Sampling Strategies (1-samp, ISS i-samp, r-samp) •\tBounded Backtracking Search (BBS) and Multi-sampling •\tRestart Depth First Search (RDFS) •\tStochastic Iterative Breadth Search (SIB) i)\tLimited Discrepancy Search 5.\tCONSTRAINT SATISFACTION PROBLEMS a.\tFormalization i)\tConstraint graphs ii) Incremental and Complete-State Formalizations iii)\tTypes of Constraint Satisfaction Problems iv)\tUnary, binary and Global Constraints v)\tAbsolute Constraints versus Preference Constraints b.\tBacktracking Search for CSPs i)\tVariable and Value Ordering ii)\tConstraint Propagation iii)\tForward checking: Antecipation iv)\tSpecial Constraints v)\tIntelligent Backtracking c.\tLocal Search for CSPs d.\tProblem Structure 6.\tSEARCHING WITH OTHER KNOWLEDGE SOURCES a.\tSubgoals i)\tIndependent ii)\tSerialisable iii)\tNon-Serialisable iv) Block-Serialisable b.\tMacro-Operators i)\tNon-Serialisable Subgoals ii)\tArbitrary Single-Goal Search Spaces iii)\tArbitrary Search Spaces c.\tAbstraction i)\tSubset Model versus Region Model ii)\tSingle-level Abstraction iii)\tMulti-level Abstraction PART 2 – PLANNING 1. CLASSICAL PLANNING a.\tFrom Problem Search to Planning b.\tPlanning in Situation Calculus c.\tThe Planning Problem i.\tPlanning Problem Languages ii.\tRepresentation of states, goals, and actions iii.\tPreconditions and Effects iv.\tExpressivity and Extensions d. Planning by searching on a situation space i.\tTotal-order Planning ii.\tForward versus Backward Search iii.\tHeuristics e.\tPlanning by searching on a plan space i.\tPartial-order Planning ii.\tLeast-Commitment Principle iii.\tLinearizations iv.\tComponents of a partial-order plan v.\tPlanning with unassigned variables f.\tPlanning Graphs i.\tPlanning Graphs for heuristic estimation ii.\tGRAPHPLAN Algorithm iii. GRAPHPLAN Termination 2. PLANNING AND ACTING IN THE REAL WORLD a.\tTime, Schedules and Resources i.\tRepresenting temporal and resource constraints ii.\tSolving Scheduling Problems b.\tHierarchical Planning i.\tHigh-level actions ii.\tSearching primitive solutions iii.\tSearching abstract solutions c.\tPlanning and Acting in Nondeterministic Domains i.\tSensorless Planning ii.\tContingent Planning iii.\tOnline Replanning d.\tMultiagent Planning i.\tPlanning with Multiple Simultaneous Actions ii.\tPlanning with Multiple Agents: Cooperation and Coordination";

        bClassifierThesis.addDocument(objPPla, "Intelligent Systems");
        bClassifierThesis.addDocument(projPPla, "Intelligent Systems");

        //Autonomous Agents and Multi-Agent Systems - AASMA
        let objAASMA = "•\tTo acquire general notions about agents and multi-agent systems; knowing how to identify and classify agents and environments, according to different properties. •\tKnowing how to develop complex systems and systems from different application areas, using an agent-oriented methodology. •\tKnowing how to define a society of agents in order to solve a specific problem. •\tBeing able to design agents with reactive, deliberative and hybrid architectures. •\tBeing able to create societies of agents that communicate, in a practical way, using suitable languages and platforms.";
        let projAASMA = "1.\tAgents and Environments a.\tThe concept of agent. b.\tProperties of agents. c.\tProperties of environments. d.\tApplications. e. Abstract agent architectures. 2.\tReactive Architectures a.\tPurely reactive agents. b.\tBrooks’ subsumption architecture. 3.\tDeliberative Architectures a.\tThe intentional stance. b.\tThe BDI model. Practical reasoning agent architectures. c.\tProcedural Reasoning System. 4. Hybrid Architectures a.\tHorizontal and vertical hybrid architectures. b.\tTouringMachines and InteRRaP. 5.\tEmotion-based Architectures a.\tAppraisal theories. b.\tThe concept and role of emotion. c.\tAgents with emotions. d.\tImpact on the studied architectures. e.\tExisting models and systems. 6.\tSocieties of Agents and Emergence a.\tSocieties of agents. Stigmergy, self-organization and emergence. b. Case studies - Game of life, BOIDS and crowds. 7.\tGame Theory a.\tIntroduction to game theory – fundamental concepts and properties. b.\tThe prisoner’s dilemma. Nash equilibrium. c.\tRepeated games. 8.\tCommunication among Agents a.\tCommunication. b. Speech acts. c.\tSemantics. KQML and KIF. FIPA-ACL. 9.\tCoordination and Cooperation among Agents a.\tCooperative distributed problem solving. b.\tThe Contract Net protocol. 10.\tNegotiation among Agents a.\tNegotiation - mechanisms/protocols and strategies. b. Auctions – characteristics and types of auction. c.\tNegotiating/bargaining in task-oriented domains. Monotonic Concession Protocol and Zeuthen Strategy. 11.\tAgent Development a.\tAgent-oriented programming. b.\tMethodologies and pitfalls in the development of agents and multi-agent systems. 12.\tMachine Learning in Agents a.\tReinforcement learning in single-agent scenarios and multi-agent scenarios. Q-learning. b.\tThe problem of coordination. 13.\tHuman-agent interaction. 14.\tApplications of agents and multi-agent systems.";

        bClassifierThesis.addDocument(objAASMA, "Intelligent Systems");
        bClassifierThesis.addDocument(projAASMA, "Intelligent Systems");

        //Learning and Intelligent Decision-Making - ADI
        let objADI = "1.\tUnderstand the main issues involved in decision-making both in uncertain and in adversarial scenarios 2.\tBe familiar with the main methods for planning and learning in such scenarios";
        let projADI = "1.\tIntroduction 2.\tDecision-making in the face of uncertainty: a.\tExpected utility. Decision theory and optimization. b.\tMarkov chains. Control and observability in Markov chains. c.\tMarkov decision processes (MDPs). State and state-action value. Policy and optimal policy. d.\tValue iteration for policy evaluation. Policy iteration. Convergence. e.\tValue iteration for policy optimization. Convergence. f. Partially observable Markov decision processes (POMDPs). Beliefs. Planning in POMDPs. Point-based methods. 3.\tDecision-making in adversarial scenarios: a.\tNormal form games. Best response. Nash equilibrium. b.\tSequential games. Extended form. Stochastic games. c.\tThe computation of Nash equilibria. Complexity. 4.\tLearning: a.\tDecision theory and Bayesian inference. The Bayes optimal classifier. b.\tBayes nets. Inference in Bayes nets. The max-sum algorithm. c.\tLearning of sequential models. The forward-backward (or Baum-Welch) algorithm. Application to POMDP model learning. 5.\tLearning and decision-making: a.\tActive learning. Learning theory. b.\tOnline learning. The weighted majority algorithm. Bandits. c.\tStochastic bandits. Regret. The UCB algorithm. Regret bounds. d. Adversarial bandits. The EXP3 algorithm. Regret bounds. e.\tLearning in MDPs (reinforcement learning, RL). Model-based reinforcement learning. f.\tValue-based reinforcement learning: TD-learning and Q-learning. Convergence. 6.\tApplications: a.\tTD-Gammon: Application of RL to backgammon. b.\tBandits and planning: Monte-carlo tree search. The UCT algorithm and its application to Go.";

        bClassifierThesis.addDocument(objADI, "Intelligent Systems");
        bClassifierThesis.addDocument(projADI, "Intelligent Systems");

        //Knowledge Representation and Reasoning - RCR
        let objRCR = "1. Give an overall view about existing advanced knowledge representation and reasoning systems (beyond First Order Logic, FOL). 2. Understand how to represent knowledge and reason in each one of these families 3. Know the advantages and disadvantages, limitations weak points of each family 4. Be able to choose the more appropriate system to a particular knowledge representation and reasoning problem. 5. Be able to build a knowledge based systems according to each family 6. Be able to represent and solve reasonably complex knowledge representation and reasoning problems. 7. Be able to represent and share large knowledge bases.";
        let projRCR = "1. Introduction: Knowledge, Representation and Reasoning. Declarative Knowledge and Procedural Knowledge. The Knowledge Representation Hypothesis. Knowledge Based Systems. The importance of representing knowledge and of reasoning with it. Soundness and Completeness. The Knowledge and Symbol Levels. 2. Some interesting applications of Knowledge Representation and Reasoning. 3. First Order Logic. Syntax, Semantics, Pragmatics. Implicit and Explicit Believes in Knowledge Based Systems in FOL. 4. Expressing Knowledge: steps to create a knowledge base in FOL. 5. Resolution: Propositional Case, Handling Variables and Quantifiers 6. Dealing with computational Intractability: FOL, Herbrand base, Propositional Logic, SAT solvers, MGU, refinements. Reasoning with Horn Clauses 7. Procedural Control of Reasoning 8. Knowledge Based Systems: definition, components, techniques, success cases, application areas in which they are appropriate, problems and limitations. Analysis of a successful expert system (for instance in medical diagnosis MYCIN - how did it work). 9. Rules in Production Systems. 10. Object Oriented Representation: key ideas. A generic system (representation and reasoning). Analysis of a particular frame system. Advanced Frame Systems (for instance, KEE): representation and reasoning. Representing knowledge in a Frame System to solve a problem. Advantages and disadvantages, problems and limitations. 11. Representing Knowledge in Description Logics. The key ideas behind Description Logics. The Boxes (T and A), intrinsic and contingent properties. A particular DL: syntax and semantics. Reasoning in DL's. Subsumption and Satisfaction. Representing a problem in DL. Classification. Beyond the Basics. Applications of DL's. 12. Semantic Web and Ontologies. Semantic Web and Ontologies. DL's and Ontologies. 13. Inheritance networks: Translational versus topological approaches. Strict and Defeasible Inheritance. Topological strategies to solve Inheritance: shortest path and inference distance. Solving Inheritance using a complete topological approach: support, specificity, preemption and redundancy. The notion of Extension. Credulous and Preferred Extension. Credulous and Skeptical Inheritance. 14. Motivation to non-monotonic logics. Reasoning by default and non-monotonicity. A non-monotonic logic, for instance Reiter's Default Logic. Default rules, default extensions, multiple extensions. Representing problems in Default Logic. Computing extensions through the syntactical system. Examples of theories with no extensions, one extension, several extensions. Interesting results for normal default theories, and for Semi-normal default theories. Advantages and disadvantages, problems and limitations. Objections to Non-Monotonic Logics 15. Uncertainty and Degrees of Belief 16. Explanation and Diagnosis.";

        bClassifierThesis.addDocument(objRCR, "Intelligent Systems");
        bClassifierThesis.addDocument(projRCR, "Intelligent Systems");

        //Image Processing and Vision - PIV
        let objPIV = "This course introduces image analysis methods as well as perception methods to extract information from 3D scenes using cameras. This includes techniques for the following problems: image filtering, segmentation, recognition, detection and tracking, self-localization and reconstruction of 3D scenes.";
        let projPIV = "(1) Camera model: projective model, camera calibration; (2) Image processing: filtering, noise reduction, pyramids and space-scale; (3) Feature extraction: edges, corners, lines, SIFT; (4) Image alignment: based on marks, dense methods; (5) Segmentation: thresholding, independent and joint labeling, Markov random fields; (6) Object recognition: shape, texture and color descriptors, scene descriptors; (7) Structure from motion: stereo vision, epipolar geometry, motion estimation.";

        bClassifierThesis.addDocument(objPIV, "Intelligent Systems");
        bClassifierThesis.addDocument(projPIV, "Intelligent Systems");

        //Social Robo`s and Human-Robot Interaction - RSIPR
        let objRSIPR = "1.\tTo create and implement AI mechanisms that give a robotic platform the capability to interact in a social manner with humans. 2.\tBe capable of integrate and evaluate features such as intentionality, emotions, collaboration into the interaction between humans and robots in different application contexts.";
        let projRSIPR = "1.\tIntroduction 2.\tSocial Robots. Types and examples. Main characteristics. 3.\tSocial Agents architectures. Main components. Sensors and actuators for social robots. 4.\tInteraction design for social robots. Interaction through voice, language and gestures. 5. Intentionality in Robots 6.\tEmotions and emotional robots. 7.\tSocial learning. Imitation. 8.\tCollaboration between humans and robots. 9. Different application domains: manufacturing; autonomous cars; robots at home; entertainment and educational robotics. 10. Experimental design and evaluations of interaction between humans and robots";

        bClassifierThesis.addDocument(objRSIPR, "Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR, "Intelligent Systems");

        //Robotic Systems in Manipulation
        let objRSIPR2 = "This course aims to expose students to the major related topics in robot manipulation, given from a computer science perspective. A high-level approach is adopted, where the student is first exposed to the software/hardware architectural specificity of a robot manipulator cell. Hands-on robot programming will be constant throughout the course using state of the art development environments such as open source research oriented ROS as well as industrial robot languages such as ABB RAPID and KUKA KRL, available at the robotics lab of the Department of Mechanical Engineering. The course concludes with advanced topics in manipulation involving visual feedback and force feedback in various application scenarios such as industrial co-worker, medical and surgical, in human-friendly environments.";
        let projRSIPR2 = "1. Introduction 2. Requirements of Robot Architectures a. Modularity and Hierarchy b. Layered Robot Control Architectures c. Fault tolerance and redundancy 3. Robot Operating System (ROS) 4. Industrial Manipulation Robots - ABB RAPID architecture and the IRB-140 Industrial Robot 5. Service Manipulation Robots - KUKA KRL architecture and the KUKA collaborative robot 6. Human-in-the-Loop: pHRI - physical Human Robot Interaction 7. Co-manipulation and Tele-manipulation architectures 8. Robot programing by demonstration 9. Visual Servoing and Visual Tracking";

        bClassifierThesis.addDocument(objRSIPR2, "Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR2, "Intelligent Systems");


        //Introduction to Robotics
        let objRSIPR3 = "1. Recognize the main modules of a robotic system (perception, navigation, decision making and task execution) and their organization and interconnection 2. Introduce the main techniques for modeling, sensory processing, navigation and decision-making in Robotics, from a perspective of applying artificial intelligence to robotics for the development of autonomous robots with machine-intelligence.";
        let projRSIPR3 = "1. What is a robot. Examples of robots. Mobile robots. (1 class - 1.5 hours). 2. Robot Systems Architectures (3 classes - 4.5 hours) a. Functional architectures (hierarchical, behavior-based, hybrid) b. Software architectures: Robot Operating System (ROS) c. Hardware architectures 3. Perception (4 classes - 6 hours) a. Sensors in Robotics (encoders, gyroscopes, accelerometers, laser scanner, vision, ...) b. Fundamentals of Robot Vision (pinhole model, stereo vision, visual tracking, object recognition in images) c. Representation of sensor uncertainty - model of observation 4. Mobile Robot Localization (7 classes - 10.5 hours) a. The localization problem: relative localization and absolute localization b. Coordinate systems. Homogeneous coordinate transformations. c. Basic concepts on Probabilistic Robotics: Bayes Filter d. Particular cases of the Bayes filter: Kalman filter, particles filter e. Kalman filter based localization f. Monte-Carlo Localization 5. Mobile Robot Motion Planning and Guidance (4 classes - 6 hours) a. The \"bug\" algorithm b. Potential Fields for Path Planning c. Probabilistic roadmaps d. RRT (Rapidly-exploring Random Trees) e. Path following: closed loop control; path as the control system reference signal. Differential kinematics. 6. Learning, Decision Making and Execution (4 classes - 7.5 hours) a. The decision-making problem b. Uncertainty in robot systems c. Decision making under uncertainty: MDPs and POMDPs d. Reinforcement learning e. Demonstration learning";

        bClassifierThesis.addDocument(objRSIPR3, "Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR3, "Intelligent Systems");

        //Machine Learning
        let objRSIPR4 = "This course aims to provide a complete and up-to-date introduction to key concepts in machine learning. After completing the course, students should be able to: •\tUnderstand the main challenges involved in machine learning. •\tUnderstand and correctly apply the steps needed to train and validate a model that is able both to explain a set of data and make predictions about unseen data. •\tUnderstand and correctly apply the more common machine learning algorithms, recognizing their corresponding domain of application.";
        let projRSIPR4 = "1.\tIntroduction to Machine Learning 2.\tBackground a)\tProbability and information theory b)\tLinear algebra c)\tOptimization 3. Introduction to supervised learning - Linear Methods a)\tLinear regression b)\tLogistic regression and perceptron 4.\tFundamentals of learning theory a)\tThe bias-variance tradeoff b)\tOverfitting and underfitting c)\tRegularization d)\tModel selection e)\tStatistical learning theory 5.\tSupervised learning - Non-parametric methods a)\tk-nearest neighbors b)\tLocally weighted regression 6.\tSupervised learning - Decision Trees and ensemble methods a)\tDecision trees b)\tRegression trees c)\tEnsemble methods 7.\tSupervised learning - Bayesian methods a)\tNaive Bayes b)\tBayesian linear regression c)\tBayes nets 8.\tSupervised learning - Kernel methods a)\tMax-margin classifiers b)\tKernel regression 9.\tSupervised learning - Artificial neural networks a)\tMultilayer perceptron b)\tBackpropagation c) Convolutional networks d)\tRecurrent networks e)\tRegularization 10.\tUnsupervised learning a)\tk-means b)\tMixture models and Expectation-Maximization c)\tPCA and ICA d)\tAutoencoders 11.\tApplications a)\tText classification b)\tImage classification";

        bClassifierThesis.addDocument(objRSIPR4, "Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR4, "Intelligent Systems");

        //Data Science
        let objRSIPR5 = "Students should be able to: •\tUnderstand the statistics and data processing concepts used in complex information processes. •\tDesign systems for knowledge discovery processes automation, and communication of their outcomes using the appropriate algorithms and validation methods at each stage. •\tUnderstand the techniques for frequent patterns recognition and outlier detection in data sets. • Identify sensitive data that might be subject to processing restrictions and data anonymization techniques that enable privacy-preserving data mining, •\tAddress large-scale data processing challenges.";
        let projRSIPR5 = "1.\tData Science. What is data science? The multidisciplinary nature. Data engineering vs. Data science. The role of a data scientist. 2. Knowledge Discovery Process. Formulating questions. Exploratory data analysis. Pre-processing overview. Evaluation overview - Occam’s razor. Information Visualization overview. Documenting the process: Notebooks. 3.\tPre-processing. Data scaling and centring. Data reduction: PCA, SVD, DFT, wavelets, SAX. Data balancing: resampling and SMOTE. Data discretization: equal-width, equal-frequency, taxonomies. Labelling. 4.\tPattern Mining. Association rules - apriori algorithm. Closed vs Maximal patterns. Evaluation metrics: support, confidence, lift and Jaccard 5.\tClustering. Algorithms: K-means, hierarchical. Evaluation: SSE (MSE), silhouette coefficient, Dunn and DB indexes. 6.\tClassification and Regression. Supervised learning: overfitting, training strategies, cross-validation. Linear and logistic regression. Classification Algorithms: KNN, Naive Bayes, Decision trees: metrics and pruning. Ensembles: AdaBoost, Random forests. Evaluation: Metrics (Accuracy, sensibility and specificity, f-measure, ROC area, confusion matrix); ROC and Lift charts 7.\tOutliers detection. 8.\tPrivacy-preserving data mining. 9.\tLarge-scale data mining. Parallelization: map-reduce, online algorithms. Indexing: LSH, Multidimensional. 10.\tCase Studies / Advanced Topics (9h) Time series and sequential analysis. Social Networks analysis; Mining graphs. Recommender Systems, Computational Advertising. Text and opinion mining. Process Mining. Stream Processing and Mining. Computational biology";

        bClassifierThesis.addDocument(objRSIPR5, "Intelligent Systems");
        bClassifierThesis.addDocument(projRSIPR5, "Intelligent Systems");


        ///////////////////////////////////////////////////////////
        /////////////Algorithms and Applications///////////////////////
        ///////////////////////////////////////////////////////////
//TODO ADVANCE ALGORITHS DUP
        //Algorithms for Computational Logic - ALC
        let objALC = "Logic is one of the pillars of Computer Science (CS), finding application in all areas of CS. Concrete examples include databases, intelligent information systems, artificial intelligence, but also specification, validation and verification of software, hardware and networks. The main goal of this course is to provide advanced training in approaches for solving logic-based computational problems. Students will be able to analyze, model and solve computationally hard problems using logic. Moreover, students will be able to understand the essential engineering aspects in building software for logic problems: implementation of deductive systems, algorithms and data structures fundamental in the implementation of Logic-based tools.";
        let projALC = "Decision problems in propositional logic (Boolean Satisfiability, SAT).Examples of modelling using propositional logic. Algorithms for SAT. Decision problems in first-order logic. The Satisfiability Modulo Theories (SMT) problem. Problem encodings for SAT. Algorithms for SMT. Constraint Programming (CP): algorithms and modeling examples. Encodings for propositional logic. Answer Set Programming (ASP): algorithms and modeling examples. Relationship with propositional logic. Function and enumeration problems for SAT, SMT, ASP and CP: including optimization problems and over specified sets of constraints. Decision, function and enumeration problems with quantified propositional variables. Application examples.";

        bClassifierThesis.addDocument(objALC, "Algorithms and Applications");
        bClassifierThesis.addDocument(projALC, "Algorithms and Applications");

        //Computability and Complexity - CC
        let objCC = "Characterize computational classes, identify complete sets, distinguish between uniform and nonuniform complexity classes and perform reductions; study open problems in computational complexity.";
        let projCC = "Time and space bounded computations. Structural relations between complexity classes. Bounded resources many-to-one (polynomial time, logarithmic space) and Turing reducibilities. NP-complete, PSPACE-complete and NL-complete sets. The polynomial time hierarchy. Probabilistic Turing machines. Classes PP, BPP, R and ZPP. PP-complete sets. Polynomial time hierarchy. Nonuniform complexity classes and Boolean circuits. P-complete sets. Negative and positive relativisations. Isomorphism and NP-completeness: cylinders and sparse complete sets. Interactive Turing machines: Arthur against Merlin games and proof-systems.";

        bClassifierThesis.addDocument(objCC, "Algorithms and Applications");
        bClassifierThesis.addDocument(projCC, "Algorithms and Applications");

        //Complex Networks Science
        let objARC = "This course provides an introduction to the study of complex networks, including algorithms, models and applications to both artificial and real networks, including social, biological and technological networks, all sharing common features and properties. The course addresses the development of scalable algorithms and data structures so that we can efficiently study large complex networks, but also in the creation of theoretical models capable of describing empirically observed patterns. The number of applications is enormous, including web search engines, evolutionary dynamics, information diffusion on Internet, social networks and blogs, network resilience, network-driven phenomena in epidemiology and computer viruses, networks dynamics, with connections in the social sciences, physics, computational biology, and economics.";
        let projARC = "Introduction to complex systems and networks science: Theory and basic concepts. Properties and characterization of biological, social and technological networks. Network models and random graphs. Efficient representation of large (sparse) networks. Succinct data-structures and coding strategies. Design and analysis of efficient and scalable algorithms for large network processing and analysis, including both sampling and randomization techniques. Databases and distributed platforms for the analysis of large networks. Link analysis and random walks. Community finding and graph partitioning. Ranking algorithms. Vertex relabeling. Dynamical processes on complex networks: The impact of network structure on economic, social and biological systems. Introduction to stochastic processes, Monte-Carlo simulations and large-scale multi-agent systems. Disease spreading and tolerance to attacks. Models of peer-influence and opinion formation. Game theory and population dynamics. Public goods problems, cooperation and reputation dynamics. Decision-making on (static and adaptive) interaction networks.";

        bClassifierThesis.addDocument(objARC, "Algorithms and Applications");
        bClassifierThesis.addDocument(projARC, "Algorithms and Applications");

        //Advanced Algorithms - AAva
        let objAAva = "Data structures and algorithms are the basic building blocks of any computer system and they become even more relevant when such systems have to process huge volumes of data and/or have to meet real time processing requirements. The aim of this course is to provide advanced training in techniques for the development and implementation of efficient algorithms and applications, with particular focus on advanced data structures and algorithms for indexing and compression, and on randomization, sampling and approximation schemes, taking into account real time processing requirements and distributed computing environments. This course will follow a problem based learning approach where techniques and methods will be intuitively and constructively explored.";
        let projAAva = "Advanced data structures. B-trees. Binomial heaps, Fibonacci heaps, and relaxad heaps. Approximation algorithms for NP-hard problems. Probabilistic techniques, random algorithms and game theory. Algorithms with random choices. Online and real-time algorithms. Parallel algorithms and algorithms using external memory. Approximation algorithms for polynomial problems, e.g., linear algorithms for MSTs. Fast algorithms for minimum cuts. Graph partitioning. Approximated counting. String algorithms and pattern matching. Suffix trees and suffix arrays. Tree algorithms, LCA. Amortized Analysis.";

        bClassifierThesis.addDocument(objAAva, "Algorithms and Applications");
        bClassifierThesis.addDocument(projAAva, "Algorithms and Applications");

        //Programming Languages - LPro
        let objLPro = "Understand the history and evolution of programming languages and programming paradigms. Understand the concepts of binding, scope, extent, type, control flow, data abstraction, control abstraction, and exceptions. Evaluate the similarities and differences between programming languages. Understand the alternatives in programming language design and implementation, including compilation and interpretation, lexical and dynamic scope, static and dynamic typing, referenced-based and value-based memory models, manual and automatic memory management, etc. Understand different programming paradigms, including imperative, functional, logical and object-oriented.";
        let projLPro = "Programming language history. Compilation and interpretation, Binding, scope and extent. Lexical scope and dynamic scope. Modules. Memory allocation. Control flow, precedence and associativity. Assignment and initialization. Sequencing and selection. Iteration. Enumerated, logical, and combined cycles. External and internal iterators. Types. Type equivalence, type compatability, and type inference. Strongly vs weakly typed languages. Dynamic vs static typed languages. Type conversion. Recursive types. Pointers. Control abstraction. Subroutines. Parameter passing. Higher-order functions. Exceptions. Data abstraction and object-orientation. Dynamic binding. Reference-based vs value-based memory model. Single vs multiple inheritance. Generic programming. Functional programming history and theoretical foundations. Evaluation model. Logic programming history and theoretical foundations, resolution and unification. Scripting languages. Application domains. Case studies.";

        bClassifierThesis.addDocument(objLPro, "Algorithms and Applications");
        bClassifierThesis.addDocument(projLPro, "Algorithms and Applications");

        ///////////////////////////////////////////////////////////
        /////////////Cyber-Security//////////////////////
        ///////////////////////////////////////////////////////////

        //Forensics Cyber-Security - CSF
        let objCSF = "The aim of the course is the study of forensic techniques and methodologies applied to digital evidence. During the course students will seize the different phases of the forensic methodology and its application to the collection and processing of digital evidence gathered form different sources, including evidence gathered from the network, from volatile and persistent memory, and from the memory of mobile devices. In the course the class will also discuss some legal issues relevant to the process of collecting and processing data in order to allow the production evidence in court.";
        let projCSF = "Fundamentals of forensic analysis Methodology Data Type Network Forensics Analysis of network data Analysis of network active systems System Forensics Analysis of Windows systems Analysis of Linux systems Analysis of mobile systems Legal Aspects (U.S., Europe).";

        bClassifierThesis.addDocument(objCSF, "Cyber-Security");
        bClassifierThesis.addDocument(projCSF, "Cyber-Security");

        //Software Security - SSof
        let objSSof = "To understand common software security problems and what are their underlying causes. To become acquainted with guidelines, techniques and tools that can help prevent or detect them, and what are the fundamentally good principles that these techniques embody.";
        let projSSof = "Principles of Computer Security Basic properties and concepts; Software security design principles. •\tSoftware Vulnerabilities Conventional applications (buffer overflows, race conditions); Web applications and databases; Mobile application; Client-side security; •\tDevelopment of secure software Software auditing; Validation and encoding. •\tControl of execution environment Dynamic protection; Virtualization and security; Trusted computing. •\tLanguage Based Security Information flow analysis; Security type systems; Secure low-level code; Proof carrying code. •\tA Case Study: Java Security Sandboxing and stack inspection; Java security flaws; Java secure programming guidelines.";

        bClassifierThesis.addDocument(objSSof, "Cyber-Security");
        bClassifierThesis.addDocument(projSSof, "Cyber-Security");

        //Network and Computer Security - SIRS
        let objSIRS = "The main goal of this curse is to provide the students with the basic set of concepts, methodologies and tool on computer and network security. This will make them comfortable with the broad set of technologies such as: local and global networks, personal and private networks, development of secure code, operating systems, distributed systems, and communications protocols.";
        let projSIRS = "•\tIntroduction •\tNetwork security and vulnerabilities •\tFirewalls and intrusion detection systems •\tDevelopment of secure code • Certification •\tSymmetrical and asymmetrical encryption and cryptographic hash functions •\tMessage authentication and digital signatures •\tDistribution protocols and management of symmetrical keys •\tDigital certificates and public key distribution infrastructures •\tAuthentications and authentication protocols •\tAuthorization •\tWireless networks security •\tVirtual private networks and secure channels";

        bClassifierThesis.addDocument(objSIRS, "Cyber-Security");
        bClassifierThesis.addDocument(projSIRS, "Cyber-Security");

        //Cryptography and Security Protocols - CPS
        let objCPS = "Master cryptosystems and cryptographic protocols in current use, develop protocols to solve specific problems and forecast future developments.";
        let projCPS = "Basic concepts and central problems in cryptography. Private key cryptosystems. Sequential ciphers. Contribution of information theory. Attacks: divide to conquer and fast correlation. Block ciphers. Examples: DES and AES. Perfect and computational security. Public key cryptosystems. RSA cryptosystem. Factoring and primality algorithms. Quantum critpoanalysis. Projective coordinates. Elliptic curves. Gauss integers. Euclidean algorithm for polynomials. Hilbert theorem. Gröbner bases. Elliptic and hyperelliptic cryptosystems. Public key protocols. ElGamal signature scheme and DSS. Elliptic curve digital signature algorithms. Blind signatures. Hash functions. Diffie-Hellman key exchange scheme. Quantum key distribution protocols. Station to station and MTI protocols. Authentication codes. Shamir secret sharing scheme. Zero-knowledge proof systems. Schnorr and Fiat-Shamir identification protocols. Muti-party secure computation and applications.";

        bClassifierThesis.addDocument(objCPS, "Cyber-Security");
        bClassifierThesis.addDocument(projCPS, "Cyber-Security");

        ///////////////////////////////////////////////////////////
        /////////////Games//////////////////////
        ///////////////////////////////////////////////////////////

        //Computer Graphics for Games - CGJ
        let objCGJ = "This course covers both theory and practice of game engine software development. It delves into the different engine subsystems including, but not limited to, rendering, character animation, and physics, and details the articulation required to support gameplay development. By the end of this course, students should understand how modern game engines work, and be able to design and develop their own game engines.";
        let projCGJ = "Introduction to game engine development. Architecture of a game engine. Asset pipeline and management. Real-time simulation loops. Human interface devices. 3D mathematics for games. Viewing pipeline: modelling, viewing, lighting, texturing. GPU rendering pipeline and shader programming. Visual effects. Advanced lighting, global illumination and shadows. Scene management. Animation systems. Collision and rigid body dynamics. Audio systems. Online multiplayer/networking. Runtime gameplay systems.";

        bClassifierThesis.addDocument(objCGJ, "Games");
        bClassifierThesis.addDocument(projCGJ, "Games");

        //Game Design - DDJ
        let objDDJ = "This course grants the students the opportunity to develop their skills on experience design and prototyping for games. The learning process is sustained in the discussion of what is a game, what are its components and what is its relation to the players (having in mind their differences). It is expected that the student develop design documents and prototypes to support his/her work on the course.";
        let projDDJ = "Components of game design Definitions of game and play History of videogames: classic and modern examples Game theory Player models Player experience Theory of fun Gameplay: world, scenarios, abstractions, progression and balancing Categorization: game genres and challenges Narrative and character development Emotion in games The creative process Documentation: concept, treatment and script Game design rules The business of games and entrepreneurship";

        bClassifierThesis.addDocument(objDDJ, "Games");
        bClassifierThesis.addDocument(projDDJ, "Games");

        //Artificial Intelligence in Games - IAJ
        let objIAJ = "1.\tUnderstand the differences between traditional AI and AI applied to game development, where other factors such as playability are more relevant that the oponent’s intelligence level. 2.\tBe familiar with the practical problems when developing AI for video games, and with the several techniques applied in comercial video games. 3.\tKnow how to design and build an AI system for a video game independently of its genre (action, sport, strategy, narrative).";
        let projIAJ = "1.\tIntroduction.AI in Games: the Complexity Fallacy; the kind of AI in Games; speed and memory; the AI Engine. 2.\tPathfinding: Pathfinding graph; Dijkstra; A*; Improving A*;World Representations; hierarchical pathfinding; Continuous Time Path-finding; Movement Planning. 3.\tMovement: the basics of movement algorithms; kinematic movement algorithms; steering behaviours; predicting physics; coordinated movement; motor control. 4.\tDecision making: decision trees; state machines; behavior trees; fuzzy logic; goal-based behavior; rule-based systems 5.\tAI Tactics and Strategy: waypoints tactics; tactical analysis; tactical pathfinding; coordinated actions. 6.\tLearning in games: learning basics; parameter modification; action prediction; decision learning; Naïve bayes classifier; decision trees; user modeling. 7.\tBoard Games: minimax algorithm; transposition tables; memory-enhanced test algorithms; Turn-based strategy games. 8.\tDesigning game AI: the design; shooters; driving; real-time strategy; sports; turn-based strategy. 9.\tAI and Interactive Narrative.";

        bClassifierThesis.addDocument(objIAJ, "Games");
        bClassifierThesis.addDocument(projIAJ, "Games");

        //Game Development Methodology - TJS
        let objTJS = "Present a vision of the different methodologies and technologies involved in the development of digital games discussing the main features and issues in each one. Grant students with conceptual tools and techniques to develop user interfaces for games with special emphasis on player controls. Develop the ability to reflect and test the player experience and gameplay. Discuss the role of conceptual modelling and user testing. Highlight the importance to take a user centred approach in the exploration of the player experience.";
        let projTJS = "The game as an interactive artefacts Involving players in the development. Agile development. Phases of game development. Interaction models. Interface types. World and player representation. Control metaphors Conceptual modelling for player experience. Economic models and dynamics models. Playtesting in the development process. Method and techniques of data gathering and analisys. Prototyping. Level design. Gameplay/Player analytics. Adaptation to the player.";

        bClassifierThesis.addDocument(objTJS, "Games");
        bClassifierThesis.addDocument(projTJS, "Games");

        ///////////////////////////////////////////////////////////
        ////////////     Bioinformatics and Computational Biology////////////////
        ///////////////////////////////////////////////////////////

        //Bioinformatics  - Bioi
        let objBioi = "Bioinformatics aims at developing computational methods and algorithms to process biological data and uses mathematical and statistical modelling to generate testable hypotheses about biological entities and processes. The goal of this course is to introduce the basic techniques that support the most recent developments on this field. Additionally, it enables the development of the ability to critically assess research publications in this field. Practical assignments during the course aim at developing the student\'s ability to develop software for bioinformatics.";
        let projBioi = "Introduction, Molecular biology main concepts, Introduction to algorithms and complexity Graphs and genetics DNA sequence analysis Pairwise alignment Multiple Sequence alignment Motif finding NGS data, algorithms and data structures Probabilistic models Gene expression data analysis Data mining Unsupervised Learning: Clustering and Biclustering Molecular phylogenetics Supervised Learning: Decision trees, Bayesian methods Integrative data analysis Seminar";

        bClassifierThesis.addDocument(objBioi, "Bioinformatics and Computational Biology");
        bClassifierThesis.addDocument(projBioi, "Bioinformatics and Computational Biology");

        //Health Ict - TIS
        let objTIS = "The general objective of the course is to provide the fundamental principles and concepts related to the use of information technology in health care. The students will acquire essential competencies and knowledge on the use of information technology in biomedical research and its crucial role in the provision of health care services.";
        let projTIS = "1. Information Technology in the life sciences 2. Clinical information systems 3. Acquisition processing and use of biomedical data. The Electronic Health Record. 4. Health Informatics data interchange standards. Thesauri and Ontologies. 5. Natural language processing and biomedical text mining. 6. Clinical Decision-support Systems. 7. Tele-monitoring 8. Tele-Health 9. Bioinformatics and Biomedical Research Infrastructures. 10. Information Search 11. Personalised medicine 12. Ethical Legal and Social Issues in IT in Health. 13. Public Health Informatics 14. IT for Healthy Living and Active Ageing. Consumer Health Informatics. 15. IT in user training and education of health professionals";

        bClassifierThesis.addDocument(objTIS, "Bioinformatics and Computational Biology");
        bClassifierThesis.addDocument(projTIS, "Bioinformatics and Computational Biology");


        ///////////////////////////////////////////////////////////
        ////////////    Language and Information Technologies//////////////////////
        ///////////////////////////////////////////////////////////

        //Natural Language - LN
        let objLN2 = "•\tLearn the basic concepts, main formalisms, techniques and algorithms, knowledge bases and corpora, used in the Natural Language Processing area. •\tUnderstand the main tasks involved in the processing of a sentence, paragraph or text and understand the main challenges of each one of these tasks. •\tLearn the main applications and be able to identify the associated technology. •\tUnderstand which are the tasks that can be done considering the current state of the art.";
        let projLN2 = "Course overview (1h) Introduction to Natural Language Processing (3h 30) Basic concepts Ambiguity and linguistic variability Associated knowledge Methodology: Train/test corpus, Cross validation, Measures (precision, recall, etc.) Regular expressions and automata (1.5h) N-Grams (4.5 h) N-grams as language models Markov assumption and probabilities of an N-gram/sentence Smoothing techniques Morphology (9) Morphology and transducers Part of speech tagging (POS) Rule-based and stochastic HMMS and Viterbi algorithm Syntax (9h) Grammars Context-free grammars Dependency grammars Probabilistic grammars Syntactic analysis Unification-based Top-down and Bottom-up Chat-parsers (Earley e CKY) Probabilistic Semantic (9h) Meaning representation Lexical semantics Thematic roles Semantic disambiguation Semantic analysis Compositional semantic analysis Statistic-based semantic analysis Classifiers and their application in semantic analysis Applications (remaining classes) Information extraction (named entity recognition, etc.) Text classification Question/answering systems Dialogue systems Machine translation Speech recognition";

        bClassifierThesis.addDocument(objLN2, "Language and Information Technologies");
        bClassifierThesis.addDocument(projLN2, "Language and Information Technologies");

        //Information Processing and Retrieval - RGI
        let objRGI = "This course aims to provide the students with an complete and updated introduction to the key-concepts and technologies used for data processing in the areas of Information Retrieval (IR), Information filtering (IF) and Information Extraction (IE). Students of this course will learn the basic theoretical concepts and acquire the practical skills needed to: 1.\tDesign modern solution for processing, managing and querying large volumes of information; 2.\tClassify and group automatically sets of resources (e.g. large sets of textual documents); 3.\tDesign search and filtering mechanisms for large collections; 4.\tDesign systems to extract information from text and/or the Web; 5.\tEvaluate empirically such systems.";
        let projRGI = "•\tIntroduction to Information Retrieval and Information Extraction ◦\tIR system architecture ◦\tDocument pre-processing •\tNon-structured data models ◦\tBoolean model ◦\tVector-space model ◦\tDimensionality reduction ◦\tProbabilistic models •\tInformation Extraction from text ◦\tClassification and clustering of documents ◦\tThe naive Bayes classifier ◦\tInformation Extraction with hidden Markov models • Evaluation of IR Systems ◦\tEvaluation metrics ◦\tReference collections ◦\tCross-validation and other issues •\tSemi-structured data models ◦\tSemi-structured data models ◦\tThe Extensible Markup Language (XML) ◦\tMarkup languages based on XML (e.g., TEI, METS, MODS) ◦\tOther languages (e.g., SGML, HTML e RDF) •\tWeb Data Extraction ◦\tWrapper generation ◦\tThe XQuery language ◦\tIR in XML documents •\tLink analysis ◦\tWeb models ◦\tBasic concepts on graphs and link analysis ◦\tUsing links to rank documents ◦\tWeb crawling •\tIndexing and querying non-structured information ◦\tRegular expressions ◦\tInverted Indexes ◦\tQuery processing •\tSimilarity search ◦\tDocument shingling and the Jaccard similarity measure ◦\tSimilarity-preserving summaries of sets and min-hash ◦\tLocality-sensitive hashing ◦\tApplications in multimedia retrieval •\tRecommendation systems ◦\tContext, personalization and information filtering ◦ Content-based recommendations ◦\tCollaborative filtering •\tDistributed processing for IR and IE ◦\tData partitioning ◦\tFederated search and meta-search engines ◦\tMap-Reduce processing •\tIE and IR applications ◦\tEnterprise search and expert search ◦\tDigital libraries ◦ Opinion mining ◦\tOther applications";

        bClassifierThesis.addDocument(objRGI, "Language and Information Technologies");
        bClassifierThesis.addDocument(projRGI, "Language and Information Technologies");

        //Spoken Language Processing - PF
        let objPF = "At the end of the course students are supposed to know the basic principles and techniques of speech coding, synthesis and recognition.";
        let projPF = "Spoken Language Processing The course is structured into 7 chapters. The first introductory chapter presents the goals of the course, and the main applications of spoken language processing. It also briefly reviews the digital signal processing concepts that are needed in this course. The second chapter discusses the way humans generate and perceive speech, describing the production and audition/perception mechanisms. The next four chapters study the way computers try to mimic this human performance, including speech signal analysis techniques, speech coding models, text-to-speech conversion (synthesis) and speech-to-text conversion (recognition) techniques. The last of these four chapters covers not only the speech recognition area but also the speaker and language recognition areas. The final chapter frequently includes talks by researchers of other areas of natural language processing (namely from other faculties) and/or visits to labs. The course is planned for 27 theory classes of 1h30 each. 1 - 2 classes 2 - 3 classes 3 - 4 classes 4 - 3 classes 5 - 5 classes 6 - 8 classes 7 - 2 classes";

        bClassifierThesis.addDocument(objPF, "Language and Information Technologies");
        bClassifierThesis.addDocument(projPF, "Language and Information Technologies");
        //Manual adjustments
        bClassifierThesis.addDocument("Laboratório de Sistemas de Língua Falada - L2F (INESC-ID Lisboa)", "Language and Information Technologies");
        bClassifierThesis.addDocument("Alberto Abad", "Language and Information Technologies");
        bClassifierThesis.addDocument("fixed expressions", "Language and Information Technologies");
        bClassifierThesis.addDocument("popular sayings", "Language and Information Technologies");
        bClassifierThesis.addDocument("speech therapy", "Language and Information Technologies");
        bClassifierThesis.addDocument("Development of a mobile application for speech therapy", "Language and Information Technologies");


        bClassifierThesis.addDocument("Nuno Jardim Nunes", "Interaction and Visualization");
        bClassifierThesis.addDocument("Alfredo Ferreira", "Interaction and Visualization");
        bClassifierThesis.addDocument("João Brisson", "Interaction and Visualization");
        bClassifierThesis.addDocument("Joaquim Jorge", "Interaction and Visualization");
        bClassifierThesis.addDocument("Daniel Jorge Viegas Gonçalves", "Interaction and Visualization");
        bClassifierThesis.addDocument("Hugo Miguel Aleixo Albuquerque Nicolau", "Interaction and Visualization");
        bClassifierThesis.addDocument("Jacinto Carlos Marques Peixoto do Nascimento", "Interaction and Visualization");
        bClassifierThesis.addDocument("Augmenting Rehabilitation", "Interaction and Visualization");
        bClassifierThesis.addDocument("Virtual Reality", "Interaction and Visualization");
        bClassifierThesis.addDocument("Design", "Interaction and Visualization");
        bClassifierThesis.addDocument("Experience", "Interaction and Visualization");
        bClassifierThesis.addDocument("Collaborative Modeling", "Interaction and Visualization");
        bClassifierThesis.addDocument("AR on Smartphones", "Interaction and Visualization");
        bClassifierThesis.addDocument("Flat Design", "Interaction and Visualization");
        bClassifierThesis.addDocument("Sensing", "Interaction and Visualization");
        bClassifierThesis.addDocument("Visualizing", "Interaction and Visualization");


        bClassifierThesis.addDocument("network fault injection", "Cyber-Security");
        bClassifierThesis.addDocument("Security", "Cyber-Security");
        bClassifierThesis.addDocument("Artificial Intelligence in Security", "Cyber-Security");
        bClassifierThesis.addDocument("REST APIs", "Cyber-Security");
        bClassifierThesis.addDocument("Communication Contracts", "Cyber-Security");
        bClassifierThesis.addDocument("Verification", "Cyber-Security");


        bClassifierThesis.addDocument("Smart-Graphs", "Algorithms and Applications");
        bClassifierThesis.addDocument("Constraint Logic", "Algorithms and Applications");


        bClassifierThesis.addDocument("microservices architecture", "Software Engineering");
        bClassifierThesis.addDocument("Framework", "Software Engineering");
        bClassifierThesis.addDocument("Virtualization", "Software Engineering");
        bClassifierThesis.addDocument("Dynamic API Invocation", "Software Engineering");
        bClassifierThesis.addDocument("monolithic architecture", "Software Engineering");
        bClassifierThesis.addDocument("António Paulo Teles de Menezes Correia Leitão", "Software Engineering");
        bClassifierThesis.addDocument("António Rito Silva", "Software Engineering");
        bClassifierThesis.addDocument("Responsive Web Applications", "Software Engineering");
        bClassifierThesis.addDocument("Service Virtualization Framework", "Software Engineering");
        bClassifierThesis.addDocument("Mobile Application", "Software Engineering");
        bClassifierThesis.addDocument("Mobile", "Software Engineering");
        bClassifierThesis.addDocument("App", "Software Engineering");


        bClassifierThesis.addDocument("NPC", "Games");
        bClassifierThesis.addDocument("Digital Games", "Games");
        bClassifierThesis.addDocument("Digital Games", "Games");
        bClassifierThesis.addDocument("Digital Games", "Games");
        bClassifierThesis.addDocument("Digital Games", "Games");
        bClassifierThesis.addDocument("Digital Games", "Games");
        bClassifierThesis.addDocument("Games", "Games");
        bClassifierThesis.addDocument("Game", "Games");
        bClassifierThesis.addDocument("tactically", "Games");
        bClassifierThesis.addDocument("João Miguel De Sousa de Assis Dias", "Games");
        bClassifierThesis.addDocument("Carlos António Roque Martinho", "Games");
        bClassifierThesis.addDocument("Rui Filipe Fernandes Prada", "Games");


        bClassifierThesis.addDocument("Architecture", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Support Services for Digital Operations Transformation", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Digital Transformation", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("IT Project Management", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Enterprise Architecture", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Business Architecture", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("COBIT", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Modeling", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Archimate", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Startup", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Business processes", "Enterprise and Information Systems");
        bClassifierThesis.addDocument("Sérgio Luís Proença Duarte Guerreiro", "Enterprise and Information Systems");


        bClassifierThesis.addDocument("robots", "Intelligent Systems");
        bClassifierThesis.addDocument("behavior for robots", "Intelligent Systems");
        bClassifierThesis.addDocument("Change Detection on Frequent Patterns", "Intelligent Systems");
        bClassifierThesis.addDocument("Matching", "Intelligent Systems");
        bClassifierThesis.addDocument("Matching", "Intelligent Systems");


        bClassifierThesis.addDocument("Urban transport", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("IoT", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("Domotic", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("Internet-of-Things", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("Framework", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("Rui Policarpo Duarte", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("Horácio Neto", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("OpenCL", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("processor", "Distributed and Cyberphysical Systems");
        bClassifierThesis.addDocument("P3", "Distributed and Cyberphysical Systems");
    }

    //TODO
    //Maps professors to areas

    bClassifierThesis.train();
    return bClassifierThesis;


}


async function saveClassifier (classifier,latestId)    {
    const classfierPath = path.join(__dirname, '../files/Thesis/c' + latestId +'.json');
    classifier.save(classfierPath, function(err) {
        if (err) {
            throw new Error(err);
        } else {
            console.log('Classifier saved on ' + classfierPath + ' at time: ' + new Date().toGMTString());
        }
    });

}


async function parseTheses(latestId, specificFile)    {
    let filePath;

    if (!specificFile)   {
        filePath = path.join(__dirname, "../files/Thesis/f" + latestId + ".html");
    } else  {
        filePath =  path.join(__dirname, "../files/Thesis/"+ specificFile);
    }

    let parsedTheses = [];
    const readFile = util.promisify(fs.readFile);
    try {
        let data = await readFile(filePath,{encoding: 'utf-8'});
        let handler = new htmlparser.DomHandler(function (error, dom) {
            if (error)  {
                throw new Error(error);
            }
            else    {

                //Path to table responsive is children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3]
                //Path to table  is  dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1]
                //Path to table head is dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[1].name);
                //Path to table body is dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[3].name);

                //Table body holds tr. Each tr corresponds to one master thesis
                let tableBody = dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[3];


                tableBody.children.forEach((element)=>  {
                    if (element.type === "tag" && element.name === "tr")  {

                        let oneThesis = {
                            id: "",
                            title: "",
                            supervisors: "",
                            vacancies: "",
                            location: "",
                            courses: "",
                            observations: "",
                            objectives: "",
                            status: "",
                            requirements: "",
                            areas: "",
                            type: ""
                        };


                        //contém os td's com info
                        let trChild = element.children;

                        //We have td's in iterations 1,3,5,7,9,11
                        let i = 0;
                        //Entre texto (espaços) e tds, trChild tem 13 elementos
                        //há 6 td's, alguns com info nested
                        trChild.forEach((subelement)=>  {
                            if (subelement.type === "tag" && subelement.name === "td")  {

                                //ID
                                if (i === 1)    {
                                    //console.log("Case 1, ID");
                                    let id = subelement.children[0].data;
                                    if (id === null)    {
                                        callback("ID of thesis is not defined", null, null);
                                    }
                                    oneThesis.id = id;
                                }

                                //Title
                                if (i === 3)    {
                                    //console.log("Case 3, Title");
                                    let title = subelement.children[0].data;
                                    oneThesis.title = title;
                                }

                                //Supervisors
                                if (i === 5)    {
                                    //console.log("Case 5, Superv");
                                    let elementsNumber = subelement.children.length;
                                    let arraySupervisors = [];
                                    //let supervisorsNumber = (elementsNumber - 1) / 2;
                                    for (let j = 1; j < elementsNumber; j = j+2)  {
                                        let supervisorDiv = subelement.children[j];
                                        let supervisor = supervisorDiv.children[0].data;
                                        arraySupervisors.push(supervisor);
                                    }


                                    oneThesis.supervisors = arraySupervisors;
                                }

                                //Vacancies
                                if (i === 7)    {
                                    //console.log("Caso 7, Vac");
                                    let vacancies = subelement.children[0].data;
                                    oneThesis.vacancies = vacancies;
                                }

                                if (i === 9)    {
                                    //console.log("Caso 9, status");
                                    let status = subelement.children[1].children[0].data;
                                    if (status === "Not assigned")    {
                                        status = "Unassigned";
                                    }
                                    oneThesis.status = status;
                                }

                                if (i === 11)    {
                                    //TODO: Impact of \n and \t at FE. Remove?
                                    //console.log("Caso 11, General");
                                    let info = subelement.children[1].children[3].children[5];

                                    let observations = info.attribs["data-observations"];
                                    if(observations)    {
                                        observations = observations.replace("\t",": ");
                                    }
                                    oneThesis.observations = observations;

                                    let requirements = info.attribs["data-requirements"];
                                    if (requirements)   {
                                        requirements = requirements.replace("\t",": ");
                                        requirements = requirements.replace("\n","");
                                    }
                                    oneThesis.requirements = requirements;

                                    let objectives = info.attribs["data-goals"];
                                    oneThesis.objectives = objectives;

                                    let location = info.attribs["data-localization"];
                                    oneThesis.location = location;


                                    let courses = info.attribs["data-degrees"];
                                    oneThesis.courses = courses;

                                }

                            }

                            //Last iteration, push thesis to array.
                            if (i === 12)   {
                                parsedTheses.push(oneThesis);
                            }

                            i++;
                        });

                        //console.log("Processed Thesis. ID: "+ oneThesis.id);
                        //console.log("Processed Thesis Number: "+ parsedTheses.length);


                    }

                    //For each thesis


                });
            }

            //End of DOM parser
        }, {normalizeWhitespace: true, withStartIndices: true});
        let parser = new htmlparser.Parser(handler);
        parser.write(data);
        parser.end();
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }

}

async function saveParsedTheses(parsedTheses, latestId) {
    const filePath =  path.join(__dirname, "../files/Thesis/p" + latestId + ".json");
    const toWrite = JSON.stringify(parsedTheses);
    fs.writeFileSync(filePath, toWrite, 'utf8', (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log("The file was saved!");
    });
}

async function getTheses ()  {
    return  await DBAccess.thesis.getThesis();
}
async function thesisBackup(theses) {
    const filePath = path.join(__dirname, "../files/Thesis/b" + new Date().getTime() + ".json");
    const toWrite = JSON.stringify(theses);
    fs.writeFileSync(filePath, toWrite, (err) => {
        if (err) {
            return (err);
        }
        console.log("The file was saved!");
    });

}

async function loadClassifier(latestId) {
    let classifierFilePath = path.join(__dirname, "../files/Thesis/c" + latestId + ".json");
    const readFile = util.promisify(fs.readFile);
    let rawClassifier = await readFile(classifierFilePath, {encoding: 'utf-8'});
    return await natural.BayesClassifier.restore(JSON.parse(rawClassifier));
}

async function loadTheses(latestId = 0, specificFile = null) {
    const readFile = util.promisify(fs.readFile);
    let parsedTheses = [];

    let thesesFilePath;

    if (latestId)   {
        thesesFilePath = path.join(__dirname, "../files/Thesis/p" + latestId + ".json");
    } else  {
        thesesFilePath  =  path.join(__dirname, "../files/Thesis/p" + specificFile + ".json");

    }
    try {
        let theses = await readFile(thesesFilePath, {encoding: 'utf-8'});
        parsedTheses = JSON.parse(theses);
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }
}

async function classifyTheses(latestId, specificFile) {
    let classifiedTheses = [];

    //load classifier and theses
    try {
        let restoredClassifier = await loadClassifier(latestId || specificFile);
        let parsedTheses = await loadTheses(latestId, specificFile);
        return await classifyAux(parsedTheses,restoredClassifier);
    } catch (e) {
        throw new Error(e);
    }

}

async function classifyAux(theses,classifier) {
    theses.map(thesis =>        thesis.title.tokenizeAndStem().includes("project") ||
                                thesis.title.tokenizeAndStem().includes("projecto") ||
                                thesis.title.tokenizeAndStem().includes("projeto") ?
                                thesis.type = "Project"  : thesis.type = "Dissertation");

    theses.map(thesis =>       thesis.areas = getFirstTwoLabels(thesis,classifier,1));

    return theses;
}

function getFirstTwoLabels (thesis, bClassifierThesis, type) {
    var criteria;
    switch(type) {
        case 0:
            criteria = thesis.title;
            break;
        case 1:
            criteria = thesis.title + " " + thesis.objectives;
            break;
        case 2:
            criteria = thesis.title + " " + thesis.requirements;
            break;
        case 3:
            criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
            break;
        case 4:
            criteria = thesis.title + " " + thesis.location;
            break;
        default:
            criteria = thesis.title;
    }

    let classArray = [];
    var classifications = bClassifierThesis.getClassifications(criteria);
    classifications.forEach(function(classPlusProbability) {
        classArray.push(classPlusProbability.label)
    });
    return classArray.slice(0,2)

}

async function saveClassifiedTheses(classifiedTheses, latestId) {
    const filePath =  path.join(__dirname, "../files/Thesis/t" + latestId + ".json");
    const toWrite = JSON.stringify(classifiedTheses);
    fs.writeFileSync(filePath, toWrite, (err) => {
        if (err) {
            return (err);
        }
        console.log("The file was saved!");
    });
}

async function loadClassifiedTheses(latestId = 0, specificFile = null) {
    const readFile = util.promisify(fs.readFile);
    let parsedTheses = [];

    let thesesFilePath;

    if (latestId)   {
        thesesFilePath = path.join(__dirname, "../files/Thesis/t" + latestId + ".json");
    } else  {
        thesesFilePath  =  path.join(__dirname, "../files/Thesis/t" + specificFile + ".json");

    }
    try {
        let theses = await readFile(thesesFilePath, {encoding: 'utf-8'});
        parsedTheses = JSON.parse(theses);
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }
}

async function saveClassifiedThesesOnDB(theses) {
    try {
        theses.map (async thesis => await DBAccess.thesis.asyncAddThesis(thesis.id, thesis.title, thesis.supervisors,
            thesis.vacancies, thesis.location, thesis.courses,
            thesis.observations, thesis.objectives, thesis.status,
            thesis.requirements, thesis.areas, 0 , thesis.type, new Date()))
    } catch (e) {
        throw new Error(e);
    }
}
async function saveClassifiedThesesOnDBAreaAndSpecialization(theses) {
    try {
        theses.map (async thesis => await DBAccess.thesis.asyncAddThesisSpecialization(thesis.id, thesis.title, thesis.supervisors,
            thesis.vacancies, thesis.location, thesis.courses,
            thesis.observations, thesis.objectives, thesis.status,
            thesis.requirements, thesis.areas, thesis.specializationAreas, 0 , thesis.type, new Date()))
    } catch (e) {
        throw new Error(e);
    }
}


async function classifyThesesArea (theses, classifier)  {
    theses.map(thesis =>       thesis.specializationAreas = getFirstTwoLabels(thesis,classifier,1));
    return theses;
}

/*

    classificationLabels: function(thesis, bClassifierThesis,type) {
            var criteria;
            switch(type) {
                case 0:
                    criteria = thesis.title;
                    break;
                case 1:
                    criteria = thesis.title + " " + thesis.objectives;
                    break;
                case 2:
                    criteria = thesis.title + " " + thesis.requirements;
                    break;
                case 3:
                    criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
                    break;
                case 4:
                    criteria = thesis.title + " " + thesis.location;
                    break;
                default:
                    criteria = thesis.title;
            }

            var classifications = bClassifierThesis.getClassifications(criteria);
            classifications.forEach(function(classPlusProbability) {
                console.log('Class ' + classPlusProbability.label + ' : ' + classPlusProbability.value);
            });

    },

    getFirstTwoLabels: function(thesis, bClassifierThesis, type) {
        var criteria;
        switch(type) {
            case 0:
                criteria = thesis.title;
                break;
            case 1:
                criteria = thesis.title + " " + thesis.objectives;
                break;
            case 2:
                criteria = thesis.title + " " + thesis.requirements;
                break;
            case 3:
                criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
                break;
            case 4:
                criteria = thesis.title + " " + thesis.location;
                break;
            default:
                criteria = thesis.title;
        }

            let classArray = [];
            var classifications = bClassifierThesis.getClassifications(criteria);
            classifications.forEach(function(classPlusProbability) {
                classArray.push(classPlusProbability.label)
            });
            return classArray.slice(0,2)

    },

 */