// STPadServerLibCommons.ts

// STPadServerLibCommons.ts

export namespace STPadServerLibCommons {
    let _onOpen: ((event: any) => void) | null = null;
    let _onClose: ((event: any) => void) | null = null;
    let _onError: ((event: any) => void) | null = null;
    let _stPadServer: any = null;
    let _isActiveX = false;
    const _resultValues: Record<string, any> = {};
  
    const supportedInterfaceVersion = "3.3.0.0";
  
    export const Strings = {
      TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",
      TOKEN_TYPE_RESPONSE: "TOKEN_TYPE_RESPONSE",
      TOKEN_TYPE_SEND: "TOKEN_TYPE_SEND",
      TOKEN_CMD_GET_SERVER_VERSION: "TOKEN_CMD_GET_SERVER_VERSION",
      TOKEN_CMD_GET_INTERFACE_VERSION: "TOKEN_CMD_GET_INTERFACE_VERSION",
      TOKEN_CMD_SET_INTERFACE_VERSION: "TOKEN_CMD_SET_INTERFACE_VERSION",
      TOKEN_CMD_INCORRECT_COMMAND: "TOKEN_CMD_INCORRECT_COMMAND",
    };
  
    export function handleLogging(message: string): void {}
    export function handleNextSignaturePoint(message: string): void {}
    export function handleDisconnect(message: string): void {}
  
    export interface Params {
      TOKEN_TYPE: string;
      TOKEN_CMD: string;
      TOKEN_PARAM_VERSION?: string;
    }
  
    export function getServerVersion(): Promise<any> {
      const params: Params = {
        TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
        TOKEN_CMD: Strings.TOKEN_CMD_GET_SERVER_VERSION,
      };
      send(JSON.stringify(params));
      return createPromise(Strings.TOKEN_CMD_GET_SERVER_VERSION);
    }
  
    export function getInterfaceVersion(): Promise<any> {
      const params: Params = {
        TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
        TOKEN_CMD: Strings.TOKEN_CMD_GET_INTERFACE_VERSION,
      };
      send(JSON.stringify(params));
      return createPromise(Strings.TOKEN_CMD_GET_INTERFACE_VERSION);
    }
  
    export function setInterfaceVersion(version: string): Promise<any> {
      if (version === undefined || version === null) {
        return Promise.reject("Invalid value for mandatory parameter 'version'");
      }
      if (compareVersion(version) > 0) {
        return Promise.reject("Target version " + version + " is too new");
      }
      const params: Params = {
        TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
        TOKEN_CMD: Strings.TOKEN_CMD_SET_INTERFACE_VERSION,
        TOKEN_PARAM_VERSION: version,
      };
      send(JSON.stringify(params));
      return createPromise(Strings.TOKEN_CMD_SET_INTERFACE_VERSION);
    }
  
    export function createConnection(
      url: string,
      onOpenParam: (event: any) => void,
      onCloseParam: (event: any) => void,
      onErrorParam: (event: any) => void
    ): void {
      if (_stPadServer != null) {
        throw "WebSocket object is already created. Please call 'STPadServerLibCommons.destroyConnection()' first!";
      }
      _onOpen = onOpenParam;
      _onClose = onCloseParam;
      _onError = onErrorParam;
  
      try {
        _isActiveX = true;
        _stPadServer = new ActiveXObject("signotec.STPadActiveXServer");
        handleLogging("STPadServerLibCommons.createConnection(): ActiveXObject successfully created");
        _stPadServer.onmessage = onmessage;
        onOpen({ SUCCESS: true });
      } catch (e) {
        handleLogging("STPadServerLibCommons.createConnection(): ActiveXObject could not be created. Reason: " + e);
        _isActiveX = false;
        _stPadServer = new WebSocket(url);
        handleLogging("STPadServerLibCommons.createConnection(): WebSocket successfully created");
        _stPadServer.onopen = onOpen;
        _stPadServer.onerror = onErrorParam;
        _stPadServer.onmessage = onmessage;
      }
    }
  
    export function destroyConnection(): void {
      handleLogging("STPadServerLibCommons.destroyConnection()");
      if (_stPadServer != null && !_isActiveX) {
        _stPadServer.close();
      }
      _stPadServer = null;
    }
  
    export function getSTPadServer(): any {
      if (_stPadServer == null) {
        throw "STPadServer object is null. Please call 'STPadServerLibCommons.createConnection()' first!";
      }
      return _stPadServer;
    }
  
    export function send(message: string): void {
      handleLogging("STPadServerLibCommons.send(): message = " + message);
      if (_stPadServer) {
        getSTPadServer().send(message);
      }
    }
  
    function onOpen(event: any): void {
      handleLogging("onOpen()");
      getServerVersion()
        .then(function (version) {
          if (compareVersion(version.serverVersion) <= 0) {
            const params: Params = {
              TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
              TOKEN_CMD: Strings.TOKEN_CMD_SET_INTERFACE_VERSION,
              TOKEN_PARAM_VERSION: supportedInterfaceVersion,
            };
            setInterfaceVersion(supportedInterfaceVersion)
                .then(function (value) {
                    if (_onOpen) _onOpen(event);
                    if (!_isActiveX) {
                    if (_stPadServer) {
                        _stPadServer.onopen = _onOpen;
                        _stPadServer.onclose = _onClose;
                    }
                    }
                })

              .catch(defaultReject);
          } else {
            if (_onOpen) _onOpen(event);
            if (!_isActiveX) {
              if (_stPadServer) {
                _stPadServer.onopen = _onOpen;
                _stPadServer.onclose = _onClose;
              }
            }
          }
        })
        .then(null, function (reason) {
          if (!_isActiveX) {
            if (_stPadServer) {
              _stPadServer.onopen = null;
              _stPadServer.onclose = null;
              _stPadServer.onerror = null;
            }
          }
          if (_stPadServer) {
            _stPadServer.onmessage = null;
          }
          destroyConnection();
          const error = new Event("error");
          (error as any).details = "Function " + reason.command + " failed. Reason: " + reason.errorMessage;
          if (_onError) _onError(error);
        });
    }
  
    // function onMessage(event: any): void {
    //   handleLogging("onMessage(): event.data = " + event.data);
    //   const message = JSON.parse(event.data);
  
    //   switch (message.TOKEN_TYPE) {
    //     case Strings.TOKEN_TYPE_REQUEST:
    //       break;
    //     case Strings.TOKEN_TYPE_RESPONSE:
    //       handleResponse(message);
    //       break;
    //     case Strings.TOKEN_TYPE_SEND:
    //       handleSendEvent(message);
    //       break;
    //     default:
    //       handleLogging("onMessage(): Invalid token type: " + message.TOKEN_TYPE);
    //   }
    // }
  
    // function handleResponse(message: any): void {
    //   let resultObject: any = { command: message.TOKEN_CMD_ORIGIN };
    //   const intReturnCode = parseInt(message.TOKEN_PARAM_RETURN_CODE);
    //   resultObject.returnCode = intReturnCode;
    //   if (intReturnCode >= 0) {
    //     switch (message.TOKEN_CMD_ORIGIN) {
    //       case Strings.TOKEN_CMD_GET_SERVER_VERSION:
    //         resultObject.serverVersion = message.TOKEN_PARAM_VERSION;
    //         resultObject.os = message.TOKEN_PARAM_OS;
    //         break;
    //       case Strings.TOKEN_CMD_GET_INTERFACE_VERSION:
    //         resultObject.interfaceVersion = message.TOKEN_PARAM_VERSION;
    //         break;
    //       case Strings.TOKEN_CMD_SET_INTERFACE_VERSION:
    //         // no further information in response here
    //         break;
    //       default:
    //         const defaultResult = STPadServerLibDefault.handleResponse(message, resultObject, intReturnCode);
    //         if (defaultResult == null) {
    //           const apiResult = STPadServerLibApi.handleResponse(message, resultObject, intReturnCode);
    //           if (apiResult == null) {
    //             handleLogging("Invalid command token: " + resultObject.command);
    //           } else {
    //             resultObject = apiResult;
    //           }
    //         } else {
    //           resultObject = defaultResult;
    //         }
    //     }
    //   } else {
    //     resultObject.errorMessage = message.TOKEN_PARAM_ERROR_DESCRIPTION;
    //     resultObject.errorCode = intReturnCode;
    //     delete resultObject.returnCode;
    //   }
    //   pushResult(resultObject);
    // }
  
    // function handleSendEvent(data: any): void {
    //   if (data.TOKEN_CMD == Strings.TOKEN_CMD_INCORRECT_COMMAND) {
    //     console.log(data.TOKEN_PARAM_EXCEPTION_CAUSE);
    //   } else {
    //     const defaultResult = STPadServerLibDefault.handleSendEvent(data);
    //     if (defaultResult == null) {
    //       STPadServerLibApi.handleSendEvent(data);
    //     }
    //   }
    // }
  
    export function defaultReject(reason: any): Promise<any> {
      handleLogging("STPadServerLibCommons.defaultReject(): reason = " + reason);
      return Promise.reject(reason);
    }
  
    export function pushResult(resultObject: any): void {
      let i = 0;
      let result = _resultValues[resultObject.command + "_" + i];
      while (result != undefined) {
        i++;
        if (i > 50) {
          handleLogging("STPadServerLibCommons.pushResult(): " + JSON.stringify(resultObject) + " could not be pushed. Too many unresolved requests");
          return;
        }
        result = _resultValues[resultObject.command + "_" + i];
      }
      _resultValues[resultObject.command + "_" + i] = resultObject;
      handleLogging("STPadServerLibCommons.pushResult() pushed " + JSON.stringify(resultObject) + " at index " + i);
    }
  
    export function grabResult(command: string): any {
      let i = 0;
      let result = _resultValues[command + "_" + i];
      while (result == undefined) {
        i++;
        result = _resultValues[command + "_" + i];
        if (i > 50) {
          return null;
        }
      }
      delete _resultValues[command + "_" + i];
      handleLogging("STPadServerLibCommons.grabResult() grabbed " + JSON.stringify(result) + " from index " + i);
      return result;
    }
  
    export function createPromise(command: string): Promise<any> {
      handleLogging("STPadServerLibCommons.createPromise(): command = " + command);
      return new Promise(function (resolve, reject) {
        (function wait() {
          const result = grabResult(command);
          if (result != null) {
            if (result.returnCode >= 0) {
              handleLogging("STPadServerLibCommons.createPromise() calls resolve(" + JSON.stringify(result) + ")");
              return resolve(result);
            } else {
              handleLogging("STPadServerLibCommons.createPromise() calls reject(" + JSON.stringify(result) + ")");
              return reject(result);
            }
          }
          setTimeout(wait, 1);
        })();
      });
    }
  
    function compareVersion(target: string): number {
      const compare = supportedInterfaceVersion.split(".");
      const targetArr = target.split(".");
  
      for (let i = 0; i < targetArr.length; i++) {
        const t = parseInt(targetArr[i]);
        const c = parseInt(compare[i]);
        if (t == c) {
          continue;
        } else {
          if (t < c) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      return 0;
    }
  
    class ParamsObject implements Params {
      TOKEN_TYPE: string;
      TOKEN_CMD: string;
      TOKEN_PARAM_VERSION?: string;
  
      constructor(command: string) {
        this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
        this.TOKEN_CMD = command;
      }
    }

    export function captureSignature(): Promise<any> {
      const params: Params = {
        TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
        TOKEN_CMD: "TOKEN_CMD_SIGNATURE_START",
      };
      send(JSON.stringify(params));
      return createPromise("TOKEN_CMD_SIGNATURE_START");
    }
  
    // export function saveSignature(): Promise<any> {
    //   const params: Params = {
    //     TOKEN_TYPE: Strings.TOKEN_TYPE_REQUEST,
    //     TOKEN_CMD: "TOKEN_CMD_SIGNATURE_SAVE_AS_STREAM_EX",
    //     TOKEN_PARAM_RESOLUTION: "300",
    //     TOKEN_PARAM_WIDTH: "500",
    //     TOKEN_PARAM_HEIGHT: "200",
    //     TOKEN_PARAM_FILE_TYPE: "PNG",
    //     TOKEN_PARAM_PEN_WIDTH: "2",
    //     TOKEN_PARAM_PEN_COLOR: "BLACK",
    //     TOKEN_PARAM_OPTIONS: "NONE", 
    //   };
    //   send(JSON.stringify(params));
    //   return createPromise("TOKEN_CMD_SIGNATURE_SAVE_AS_STREAM_EX");
    // }

    // export function searchForPads() {
    //   const params = new STPadServerLibDefault.Params.searchForPads();
    //   params.setPadSubset("HID");
    //   return STPadServerLibDefault.searchForPads(params);
    // }
    
    // export function getSignatureData() {
    //   const params = new STPadServerLibDefault.Params.getSignatureData();
    //   return STPadServerLibDefault.getSignatureData(params);
    // }
    
    // export function openPad(index) {
    //   if (index === undefined || index === null) {
    //     throw "Invalid value for mandatory parameter 'index'";
    //   }
    //   const params = new STPadServerLibDefault.Params.openPad(index);
    //   return STPadServerLibDefault.openPad(params);       
    // }
  }
  export const STPadServerLibDefault = (() => {
    const context: any = {};

    context.handleRetrySignature = (message: any) => { };
    context.handleConfirmSignature = (message: any) => { };
    context.handleCancelSignature = (message: any) => { };
    context.handleConfirmSelection = (message: any) => { };
    context.handleCancelSelection = (message: any) => { };
    context.handleSelectionChange = (message: any) => { };

    context.FileType = {
        TIFF: 0,
        PNG: 1,
        BMP: 2,
        JPEG: 3,
        GIF: 4
    };

    context.FontStyle = {
        BOLD: "BOLD",
        ITALIC: "ITALIC",
        UNDERLINE: "UNDERLINE"
    };

    context.RsaScheme = {
        None: "NONE",
        NoOID: "NO_HASH_OID",
        PKCS1_V1_5: "PKCS1_V1_5",
        PSS: "PSS"
    };

    const Strings = {
        TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",
        TOKEN_CMD_SEARCH_FOR_PADS: "TOKEN_CMD_SEARCH_FOR_PADS",
        TOKEN_CMD_OPEN_PAD: "TOKEN_CMD_OPEN_PAD",
        TOKEN_CMD_CLOSE_PAD: "TOKEN_CMD_CLOSE_PAD",
        TOKEN_CMD_SIGNATURE_START: "TOKEN_CMD_SIGNATURE_START",
        TOKEN_CMD_SIGNATURE_CANCEL: "TOKEN_CMD_SIGNATURE_CANCEL",
        TOKEN_CMD_SIGNATURE_RETRY: "TOKEN_CMD_SIGNATURE_RETRY",
        TOKEN_CMD_SIGNATURE_CONFIRM: "TOKEN_CMD_SIGNATURE_CONFIRM",
        TOKEN_CMD_SIGNATURE_SIGN_DATA: "TOKEN_CMD_SIGNATURE_SIGN_DATA",
        TOKEN_CMD_SIGNATURE_IMAGE: "TOKEN_CMD_SIGNATURE_IMAGE",
        TOKEN_CMD_SIGNING_CERT: "TOKEN_CMD_SIGNING_CERT",
        TOKEN_CMD_SIGNATURE_POINT: "TOKEN_CMD_SIGNATURE_POINT",
        TOKEN_CMD_SELECTION_DIALOG: "TOKEN_CMD_SELECTION_DIALOG",
        TOKEN_CMD_SELECTION_CHANGE: "TOKEN_CMD_SELECTION_CHANGE",
        TOKEN_CMD_SELECTION_CONFIRM: "TOKEN_CMD_SELECTION_CONFIRM",
        TOKEN_CMD_SIGNATURE_STOP: "TOKEN_CMD_SIGNATURE_STOP",
        TOKEN_CMD_SELECTION_CANCEL: "TOKEN_CMD_SELECTION_CANCEL",
        TOKEN_CMD_DISCONNECT: "TOKEN_CMD_DISCONNECT",
        TOKEN_CMD_ERROR: "TOKEN_CMD_ERROR",

        TOKEN_PARAM_CONNECTED_PADS: "TOKEN_PARAM_CONNECTED_PADS",
        TOKEN_PARAM_LAYOUT_ID: "TOKEN_PARAM_LAYOUT_ID",
        TOKEN_PARAM_TEXT_BLOCKS: "TOKEN_PARAM_TEXT_BLOCKS",
        TOKEN_PARAM_TEXT: "TOKEN_PARAM_TEXT",
        TOKEN_PARAM_WIDTH: "TOKEN_PARAM_WIDTH",
        TOKEN_PARAM_HEIGHT: "TOKEN_PARAM_HEIGHT",
        TOKEN_PARAM_FONT_NAME: "TOKEN_PARAM_FONT_NAME",
        TOKEN_PARAM_FONT_STYLE: "TOKEN_PARAM_FONT_STYLE",
        TOKEN_PARAM_MAX_FONT_SIZE: "TOKEN_PARAM_MAX_FONT_SIZE",
        TOKEN_PARAM_FONT_SIZE_ID: "TOKEN_PARAM_FONT_SIZE_ID",
        TOKEN_PARAM_CONSTANT: "TOKEN_PARAM_CONSTANT",
        TOKEN_PARAM_FIELD_LIST: "TOKEN_PARAM_FIELD_LIST",
        TOKEN_PARAM_FIELD_ID: "TOKEN_PARAM_FIELD_ID",
        TOKEN_PARAM_FIELD_TEXT: "TOKEN_PARAM_FIELD_TEXT",
        TOKEN_PARAM_FIELD_CHECKED: "TOKEN_PARAM_FIELD_CHECKED",
        TOKEN_PARAM_FIELD_REQUIRED: "TOKEN_PARAM_FIELD_REQUIRED"
    };


    context.searchForPads = function() {
        const params = new context.Params.searchForPads();
        // Set additional parameters if needed
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SEARCH_FOR_PADS);
    };

    // Implementation for openPad
    context.openPad = function(index) {
        if (index === undefined || index === null) {
            throw "Invalid value for mandatory parameter 'index'";
        }
        const params = new context.Params.openPad(index);
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_OPEN_PAD);
    };

    // Implementation for closePad
    context.closePad = function(index) {
        if (index === undefined || index === null) {
            throw "Invalid value for mandatory parameter 'index'";
        }
        const params = new context.Params.closePad(index);
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_CLOSE_PAD);
    };

    // Implementation for startSignature
    context.startSignature = function() {
        const params = new context.Params.startSignature();
        // Set additional parameters if needed
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_START);
    };

    context.cancelSignature = () => {
        // ... (Implementation for cancelSignature)
    };

    context.retrySignature = () => {
        // ... (Implementation for retrySignature)
    };

    context.confirmSignature = () => {
        // ... (Implementation for confirmSignature)
    };

    context.stopSignature = () => {
        // ... (Implementation for stopSignature)
    };

    context.startSelectionDialog = (params: any) => {
        // ... (Implementation for startSelectionDialog)
    };

    context.getSignatureData = (params: any) => {
        // ... (Implementation for getSignatureData)
    };

    context.getSignatureImage = (params: any) => {
        // ... (Implementation for getSignatureImage)
    };

    context.getSigningCert = () => {
        // ... (Implementation for getSigningCert)
    };

    context.handleResponse = (message: any, resultObject: any, intReturnCode: any) => {
        // ... (Implementation for handleResponse)
    };

    context.handleSendEvent = (message: any) => {
        // ... (Implementation for handleSendEvent)
    };

    // return {
    //     context,
    //     FileType,
    //     FontStyle,
    //     RsaScheme,
    //     Params,
    // };
})();
  