# RDF-Connect Protobuf Files

RDF-Connect is a distributed RDF (Resource Description Framework) processing system that enables streaming data processing with real-time orchestration and logging capabilities.

Full specification detailing the implementations can be found on [here](https://rdf-connect.github.io/specification/).

## Core Capabilities

### 🚀 **Distributed Processing Architecture**
- **Orchestrator-Runner Model**: Centralized orchestration with distributed execution
- **Processor Lifecycle Management**: Dynamic processor initialization, configuration, and lifecycle control
- **Bidirectional Streaming**: Full-duplex communication between orchestrators and runners

### 📡 **Advanced Message Routing**
- **Channel-Based Routing**: Messages routed through logical channels with sequence numbering
- **URI-Based Identification**: Unique component identification system

### 🌊 **Streaming Data Protocol**
- **Chunked Streaming**: Efficient streaming of large datasets with identification
- **Stream Identification**: Each stream has unique channel and local sequence number identifiers
- **Data Chunking**: Optimized data transmission with metadata preservation

### 🔧 **Robust Error Handling**
- **Built-in Error Reporting**: Comprehensive error handling throughout the protocol
- **Graceful Degradation**: Optional error fields allow for partial success scenarios
- **Service-Level Error Propagation**: Errors bubble up through the service interface

### 📊 **Pipeline Management**
- **Turtle Format Support**: Full pipeline information in Turtle RDF serialization
- **SHACL Integration**: Built-in support for SHACL (Shapes Constraint Language) validation
- **Dynamic Pipeline Updates**: Runtime pipeline modification capabilities

### 📝 **Comprehensive Logging**
- **Dedicated Log Streams**: Separate logging channels for debugging and monitoring
- **Structured Logging**: Log messages with levels, entities, and aliases
- **Real-time Log Streaming**: Continuous log streaming for live monitoring

## Protocol Components

### Core Message Types

#### `common.proto` - Base Protocol Definitions
- `Error`: Error reporting with cause description
- `Close`: Channel closure signaling
- `DataChunk`: Raw data chunk for streaming
- `SendingMessage`: Message sent from runner to orchestrator with channel, data, and local sequence number
- `ReceivingMessage`: Message received by runner from orchestrator with global sequence number, channel, and data
- `ReceivingStreamMessage`: Stream message received by runner with global sequence number and channel
- `ReceivingStreamControl`: Control message for streaming to producer (contains stream sequence number)
- `SendingStreamControl`: Control message for streaming from consumer (contains global or stream sequence number)
- `StreamIdentify`: First message when runner sends streaming data (channel, local sequence number, runner URI)
- `StreamChunk`: Wrapper for StreamIdentify or DataChunk messages
- `MessageProcessed`: Processing acknowledgment with channel and global sequence number

#### `service.proto` - Service Interface
- `LogMessage`: Structured logging with levels, entities, and aliases
- `Processor`: Processor definition with URI, configuration, and arguments
- `ToRunner`: Message container sent to runners (contains processor, start, message, close, stream message, pipeline, or processed)
- `ProcessorInitialized`: Initialization confirmation with URI and optional error
- `RunnerIdentify`: Runner identification with URI
- `FromRunner`: Message container from runners (contains initialized, close, identify, message, or processed)
- `Runner` Service: Main service interface with 4 RPC methods


## Message Flow Diagrams

### Startup Sequence

```mermaid
sequenceDiagram
    participant R as Runner
    participant O as Orchestrator

    Note over R,O: Connection Establishment
    R->>O: connect() - Initiate bidirectional stream

    Note over R,O: Identify
    R->>O: FromRunner{identify: RunnerIdentify(uri)}

    Note over O,R: Pipeline Updates
    O->>R: ToRunner{pipeline: "Turtle RDF with SHACL shapes"}
    R->>R: Update processing pipeline

    Note over R,O: Processor Configuration
    O->>R: ToRunner{proc: Processor(uri, config, arguments)}

    Note over R,O: Initialization Confirmation
    R->>O: FromRunner{initialized: ProcessorInitialized(uri, [error])}

    Note over R,O: Processing Start
    O->>R: ToRunner{start: Empty}
    R->>R: Ready for processing
```

### Message Processing Flow

```mermaid
sequenceDiagram
    participant R2 as Runner2
    participant O as Orchestrator
    participant R1 as Runner1

    Note right of O: Standard Message Flow
    R1->>O: FromRunner{SendingMessage(localSequenceNumber, channel, data)}
    O->>R2: ToRunner{msg: ReceivingMessage(globalSequenceNumber, channel, data)}
    R2->>O: FromRunner{processed: GlobalAck(globalSequenceNumber, channel)}
    O->>R1: ToRunner{processed: LocalAck(localSequenceNumber, channel)}
```

### Streaming Message Flow

```mermaid
sequenceDiagram
    participant R2 as Runner2
    participant O as Orchestrator
    participant R1 as Runner1

    Note left of R1: Stream Identification
    R1->>O: sendStreamMessage() - StreamChunk{id: StreamIdentify(localSequenceNumber, channel, runner)}

    Note left of O: Stream Initiation
    O->>R2: ToRunner{streamMsg: ReceivingStreamMessage(globalSequenceNumber, channel)}

    Note right of R2: Stream Reception
    R2->>O: receiveStreamMessage() - SendingStreamControl{globalSequenceNumber}

    Note right of O: Ready to generate data
    O->>R1: Sends stream control - ReceivingStreamControl{streamSequenceNumber}

    R1->>R1: Generate data chunks
    loop For Each Chunk
        R1->>O: sendStreamMessage() - StreamChunk{data: DataChunk(bytes)}
        O->>R2: receiveStreamMessage() - DataChunk(bytes)
        R2->>O: chunk handled - SendingStreamControl{streamSequenceNumber}
        O->>R1: chunk handled - ReceivingStreamControl{streamSequenceNumber}
    end
    R2->>O: FromRunner{processed: GlobalAck(globalSequenceNumber, channel)}
    O->>R1: ToRunner{processed: LocalAck(localSequenceNumber, channel)}
```

### Logging Flow

```mermaid
sequenceDiagram
    participant R as Runner
    participant O as Orchestrator

    Note over R,O: Continuous Logging
    R->>O: logStream() - LogMessage(level, msg, entities, aliases)
```

## Service Interface

### Core RPC Methods

#### `connect(stream FromRunner) returns (stream ToRunner)`
- **Purpose**: Main bidirectional communication channel
- **Flow**: Runner → Orchestrator message streaming
- **Use Case**: Primary orchestration and execution communication

#### `sendStreamMessage(stream StreamChunk) returns (stream ReceivingStreamControl)`
- **Purpose**: Send streaming data with identification
- **Flow**: StreamChunk (StreamIdentify/DataChunk) → stream of ReceivingStreamControl responses
- **Use Case**: Chunked data transmission with flow control

#### `receiveStreamMessage(stream SendingStreamControl) returns (stream DataChunk)`
- **Purpose**: Receive streaming data by identification
- **Flow**: Request SendingStreamControl → stream of DataChunk responses
- **Use Case**: Retrieve specific data streams with consumer control

#### `logStream(stream LogMessage) returns (google.protobuf.Empty)`
- **Purpose**: Structured logging stream
- **Flow**: Continuous LogMessage stream → Empty acknowledgments
- **Use Case**: Real-time monitoring and debugging

## Protocol Features

### Error Resilience
- All critical operations include optional error fields
- Graceful error propagation through the service interface
- Non-blocking error handling for continued operation

### Performance Optimizations
- Chunked streaming reduces memory overhead
- SequenceNumber-based sequencing enables efficient message ordering
- Channel-based routing minimizes message routing overhead

### Extensibility
- Oneof message patterns allow for future protocol extensions
- Modular design supports easy addition of new message types
- URI-based component identification supports dynamic scaling

## Integration Patterns

### Typical Usage Flow
1. **Setup**: Runner connects to Orchestrator via `connect()`
2. **Configuration**: Orchestrator sends processor configuration
3. **Initialization**: Runner confirms initialization status
4. **Processing**: Bidirectional message exchange begins
5. **Streaming**: Data streams established as needed
6. **Logging**: Continuous logging for monitoring
7. **Shutdown**: Graceful channel closure

### Error Scenarios
- **Initialization Failure**: ProcessorInit with error field populated
- **Processing Errors**: Error messages in message streams
- **Stream Failures**: Individual stream closure without affecting others
