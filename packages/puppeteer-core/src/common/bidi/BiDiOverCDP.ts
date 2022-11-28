
import * as BiDiMapper from '../../../third_party/bidiMapper/mapper.js';
import { Connection as CDPPPtrConnection } from '../Connection.js';
import { Connection as BidiPPtrConnection } from './Connection.js';

export function connectBiDiOverCDP(cdp: CDPPPtrConnection): BidiPPtrConnection {
  const transport = new BiDiCDPTransport(cdp);
  const cdpConnection = new BiDiMapper.CdpConnection(transport, console.log)
  const bidiServer = new BiDiMapper.BidiServer(transport);
  // @ts-ignore
  const eventManager = new BiDiMapper.EventManager(bidiServer);
  const pptrBiDiConnection = new BidiPPtrConnection({
    send(message: string): void {
      bidiServer.sendMessage(JSON.parse(message));
    },
    close(): void {
      bidiServer.close();
      cdp.dispose();
    },
    onmessage(message: string): void {
      const data = JSON.parse(message);
      bidiServer.emit(data.method, data.params);
    },
    onclose() {
      bidiServer.close();
      cdp.dispose();
    }
  });
  // @ts-ignore
  BiDiMapper.CommandProcessor.run(cdpConnection, bidiServer, eventManager, '');
  return pptrBiDiConnection;
}

export class BiDiCDPTransport implements BiDiMapper.ITransport {
  #cdp: CDPPPtrConnection;

  constructor(cdp: CDPPPtrConnection) {
    this.#cdp = cdp;
  }
  setOnMessage(handler: (message: string) => Promise<void>) {
    // @ts-ignore
    this.#cdp.on('*', (method: string, params: any) => {
      handler(JSON.stringify({ method, params }));
    });
  };

  sendMessage(message: string) {
    const json = JSON.parse(message);
    return this.#cdp.send(json.method, json.params);
  };

  close(): void {
   this.#cdp.dispose();
  }
}
