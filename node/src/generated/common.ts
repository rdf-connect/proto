// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.20.3
// source: common.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "rdfc";

export interface Error {
  cause: string;
}

export interface Close {
  channel: string;
}

export interface Message {
  channel: string;
  data: Uint8Array;
}

export interface Id {
  id: number;
}

export interface DataChunk {
  data: Uint8Array;
}

export interface StreamMessage {
  id: Id | undefined;
  channel: string;
}

function createBaseError(): Error {
  return { cause: "" };
}

export const Error: MessageFns<Error> = {
  encode(message: Error, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.cause !== "") {
      writer.uint32(10).string(message.cause);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Error {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.cause = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Error {
    return { cause: isSet(object.cause) ? globalThis.String(object.cause) : "" };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    if (message.cause !== "") {
      obj.cause = message.cause;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.cause = object.cause ?? "";
    return message;
  },
};

function createBaseClose(): Close {
  return { channel: "" };
}

export const Close: MessageFns<Close> = {
  encode(message: Close, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Close {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Close {
    return { channel: isSet(object.channel) ? globalThis.String(object.channel) : "" };
  },

  toJSON(message: Close): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Close>, I>>(base?: I): Close {
    return Close.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Close>, I>>(object: I): Close {
    const message = createBaseClose();
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBaseMessage(): Message {
  return { channel: "", data: new Uint8Array(0) };
}

export const Message: MessageFns<Message> = {
  encode(message: Message, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Message {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.channel = object.channel ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseId(): Id {
  return { id: 0 };
}

export const Id: MessageFns<Id> = {
  encode(message: Id, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Id {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Id {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: Id): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Id>, I>>(base?: I): Id {
    return Id.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Id>, I>>(object: I): Id {
    const message = createBaseId();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseDataChunk(): DataChunk {
  return { data: new Uint8Array(0) };
}

export const DataChunk: MessageFns<DataChunk> = {
  encode(message: DataChunk, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DataChunk {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataChunk {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: DataChunk): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataChunk>, I>>(base?: I): DataChunk {
    return DataChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataChunk>, I>>(object: I): DataChunk {
    const message = createBaseDataChunk();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseStreamMessage(): StreamMessage {
  return { id: undefined, channel: "" };
}

export const StreamMessage: MessageFns<StreamMessage> = {
  encode(message: StreamMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== undefined) {
      Id.encode(message.id, writer.uint32(10).fork()).join();
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = Id.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.channel = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamMessage {
    return {
      id: isSet(object.id) ? Id.fromJSON(object.id) : undefined,
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
    };
  },

  toJSON(message: StreamMessage): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = Id.toJSON(message.id);
    }
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamMessage>, I>>(base?: I): StreamMessage {
    return StreamMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamMessage>, I>>(object: I): StreamMessage {
    const message = createBaseStreamMessage();
    message.id = (object.id !== undefined && object.id !== null) ? Id.fromPartial(object.id) : undefined;
    message.channel = object.channel ?? "";
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
