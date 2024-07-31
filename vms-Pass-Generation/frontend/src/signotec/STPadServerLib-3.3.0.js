
var STPadServerLibCommons = {};
(function(context) {
    var _onOpen = null;
    var _onClose = null;
    var _onError = null;
    var _stPadServer = null;
    var _isActiveX = false;
    var _resultValues = {};

    const supportedInterfaceVersion = "3.3.0.0";

    const Strings = {
        TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",
        TOKEN_TYPE_RESPONSE: "TOKEN_TYPE_RESPONSE",
        TOKEN_TYPE_SEND: "TOKEN_TYPE_SEND",
        TOKEN_CMD_GET_SERVER_VERSION: "TOKEN_CMD_GET_SERVER_VERSION",
        TOKEN_CMD_GET_INTERFACE_VERSION: "TOKEN_CMD_GET_INTERFACE_VERSION",
        TOKEN_CMD_SET_INTERFACE_VERSION: "TOKEN_CMD_SET_INTERFACE_VERSION",
        TOKEN_CMD_INCORRECT_COMMAND: "TOKEN_CMD_INCORRECT_COMMAND"
    };

    context.handleLogging = function (message) { };
    context.handleNextSignaturePoint = function (message) { };
    context.handleDisconnect = function (message) { };

    context.Params = {
        getServerVersion: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_GET_SERVER_VERSION;
        },
        getInterfaceVersion: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_GET_INTERFACE_VERSION;
        },
        setInterfaceVersion: function(version) {
            if (version === undefined || version === null) {
                throw "Invalid value for mandatory parameter 'version'";
            }
            if (0 < compareVersion(version)) {
                throw "Target version " + version + " is too new";
            }
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SET_INTERFACE_VERSION;
            this.TOKEN_PARAM_VERSION = version;
        }
    };

    context.getServerVersion = function() {
        context.send(JSON.stringify(new context.Params.getServerVersion()));
        return context.createPromise(Strings.TOKEN_CMD_GET_SERVER_VERSION);
    };

    context.getInterfaceVersion = function () {
        context.send(JSON.stringify(new context.Params.getInterfaceVersion()));
        return context.createPromise(Strings.TOKEN_CMD_GET_INTERFACE_VERSION);
    };

    context.setInterfaceVersion = function(params) {
        context.send(JSON.stringify(params));
        return context.createPromise(Strings.TOKEN_CMD_SET_INTERFACE_VERSION);
    };

    context.createConnection = function(url, onOpenParam, onCloseParam, onErrorParam) {
        if (_stPadServer != null) {
            throw "WebSocket object is already created. Please call 'STPadServerLibCommons.destroyConnection()' first!";
        }
        _onOpen = onOpenParam;
        _onClose = onCloseParam;
        _onError = onErrorParam;

        try {
            _isActiveX = true;
            _stPadServer = new ActiveXObject("signotec.STPadActiveXServer");
            STPadServerLibCommons.handleLogging("STPadServerLibCommons.createConnection(): ActiveXObject successfully created");
            _stPadServer.onmessage = onMessage;
            onOpen({SUCCESS:true});
        } catch (e) {
            STPadServerLibCommons.handleLogging("STPadServerLibCommons.createConnection(): ActiveXObject could not be created. Reason: " + e);
            _isActiveX = false;
            _stPadServer = new WebSocket(url);
            STPadServerLibCommons.handleLogging("STPadServerLibCommons.createConnection(): WebSocket successfully created");
            _stPadServer.onopen = onOpen;
            _stPadServer.onerror = onErrorParam;
            _stPadServer.onmessage = onMessage;
        }
    };

    context.destroyConnection = function () {
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.destroyConnection()");
        if ((_stPadServer != null) && !_isActiveX) { 
            _stPadServer.close();
        }
        _stPadServer = null;
    };

    context.getSTPadServer = function() {
        if (_stPadServer == null) {
            throw "STPadServer object is null. Please call 'STPadServerLibCommons.createConnection()' first!";
        }
        return _stPadServer;
    };

    context.send = function(message) {
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.send(): message = " + message);
    	context.getSTPadServer().send(message);
    };    

    function onOpen(event) {
    	STPadServerLibCommons.handleLogging("onOpen()");
        context.getServerVersion()
        .then(function (version) {
            if (compareVersion(version.serverVersion) <= 0) {
                var params = new context.Params.setInterfaceVersion(supportedInterfaceVersion);
                context.setInterfaceVersion(params)
                .then(function (value) {
                    _onOpen(event);
                    if (!_isActiveX) {
                        _stPadServer.onopen = _onOpen;
                        _stPadServer.onclose = _onClose;
                    }
                }, context.defaultReject);
            } else {
                _onOpen(event);
                if (!_isActiveX) {
                    _stPadServer.onopen = _onOpen;
                    _stPadServer.onclose = _onClose;
                }
            }
        }, context.defaultReject)
        .then(null, function (reason) {
            if (!_isActiveX) {
                _stPadServer.onopen = null;
                _stPadServer.onclose = null;
                _stPadServer.onerror = null;
            }
            _stPadServer.onmessage = null;
            context.destroyConnection();
            var error = new Event("error");
            error.details = "Function " + reason.command + " failed. Reason: " + reason.errorMessage;
            _onError(error);
        });
    }

    function onMessage(event) {
		STPadServerLibCommons.handleLogging("onMessage(): event.data = " + event.data);
        var message = JSON.parse(event.data);

        switch (message.TOKEN_TYPE) {
            case Strings.TOKEN_TYPE_REQUEST:
                break;
            case Strings.TOKEN_TYPE_RESPONSE:
                handleResponse(message);
                break;
            case Strings.TOKEN_TYPE_SEND:
                handleSendEvent(message);
                break;
            default:
                STPadServerLibCommons.handleLogging("onMessage(): Invalid token type: " + message.TOKEN_TYPE);
        }
    }

    function handleResponse(message) {
        var resultObject = {command: message.TOKEN_CMD_ORIGIN};
        var intReturnCode = parseInt(message.TOKEN_PARAM_RETURN_CODE);
        resultObject.returnCode = intReturnCode;
        if (intReturnCode >= 0) {
            switch (message.TOKEN_CMD_ORIGIN) {
                case Strings.TOKEN_CMD_GET_SERVER_VERSION:
                    resultObject.serverVersion = message.TOKEN_PARAM_VERSION;
                    resultObject.os = message.TOKEN_PARAM_OS;
                    break;
                case Strings.TOKEN_CMD_GET_INTERFACE_VERSION:
                    resultObject.interfaceVersion = message.TOKEN_PARAM_VERSION;
                    break;
                case Strings.TOKEN_CMD_SET_INTERFACE_VERSION:
                    // no further information in response here
                    break;
                default:
                    var defaultResult = STPadServerLibDefault.handleResponse(message, resultObject, intReturnCode);
                    if (defaultResult == null) {
                        var apiResult = STPadServerLibApi.handleResponse(message, resultObject, intReturnCode);
                        if (apiResult == null) {
                            STPadServerLibCommons.handleLogging("Invalid command token: " + resultObject.command);
                        } else {
                            resultObject = apiResult;
                        }
                    } else {
                        resultObject = defaultResult;
                    }
            }
        } else {
            resultObject.errorMessage = message.TOKEN_PARAM_ERROR_DESCRIPTION;
            resultObject.errorCode = intReturnCode;
            delete resultObject["returnCode"];
        }
        context.pushResult(resultObject);
    }

    function handleSendEvent(data) {
        if (data.TOKEN_CMD == Strings.TOKEN_CMD_INCORRECT_COMMAND) {
            console.log(data.TOKEN_PARAM_EXCEPTION_CAUSE);
        }
        else {
            var defaultResult = STPadServerLibDefault.handleSendEvent(data);
            if (defaultResult == null) {
                STPadServerLibApi.handleSendEvent(data);
            }
        }
    }

    context.defaultReject = function(reason) {
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.defaultReject(): reason = " + reason);
        return Promise.reject(reason);
    };

    context.pushResult = function (resultObject) {
    	var i = 0;
        var result = _resultValues[resultObject.command+"_"+i];
    	while (result != undefined) {
    		i++;
    		if(i > 50) {
                STPadServerLibCommons.handleLogging("STPadServerLibCommons.pushResult(): " + JSON.stringify(resultObject) + " could not be pushed. Too many unresolved requests");
    			return;
    		}
            result = _resultValues[resultObject.command+"_"+i];
    		
    	}
        _resultValues[resultObject.command+"_"+i] = resultObject;
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.pushResult() pushed " + JSON.stringify(resultObject) + " at index " + i);
    };
    
    context.grabResult = function(command) {
    	var i = 0;
    	var result = _resultValues[command+"_"+i];
    	while (result == undefined) {
    		i++;
    		result = _resultValues[command+"_"+i];
    		if(i > 50) {
    			return null;
    		}
    	}
    	delete _resultValues[command+"_"+i];
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.grabResult() grabbed " + JSON.stringify(result) + " from index " + i);
    	return result;
    };    
    
    context.createPromise = function(command) {
        STPadServerLibCommons.handleLogging("STPadServerLibCommons.createPromise(): command = " + command);
        return new Promise(function(resolve, reject) {
            (function wait() {
            	var result = context.grabResult(command);
                if (result != null) {
                    if (0 <= result.returnCode) {
                        STPadServerLibCommons.handleLogging("STPadServerLibCommons.createPromise() calls resolve(" + JSON.stringify(result) + ")");
                        return resolve(result);
                    } else {
                        STPadServerLibCommons.handleLogging("STPadServerLibCommons.createPromise() calls reject(" + JSON.stringify(result) + ")");
                        return reject(result);
                    }
                }
                setTimeout(wait, 1);
            })();
        });
    };

    function compareVersion(target) {
        var compare = supportedInterfaceVersion.split(".");
        target = target.split(".");

        for (var i = 0; i < target.length; i++) {
            var t = parseInt(target[i]);
            var c = parseInt(compare[i]);
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
})(STPadServerLibCommons);

var STPadServerLibDefault = {};
(function(context) {
    context.handleRetrySignature = function (message) { };
    context.handleConfirmSignature = function (message) { };
    context.handleCancelSignature = function (message) { };
    context.handleConfirmSelection = function (message) { };
    context.handleCancelSelection = function (message) { };
    context.handleSelectionChange = function (message) { };

    // const (enums)
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

    context.Params = {
        searchForPads: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SEARCH_FOR_PADS;

            this.setPadSubset = function(padSubset) {
                if (padSubset === undefined || padSubset === null) {
                    throw "'padSubset' is undefined or null";
                }
                this.TOKEN_PARAM_PAD_SUBSET = padSubset;
            };
        },
        openPad: function(index) {
            if (index === undefined || index === null) {
                throw "Invalid value for mandatory parameter 'index'";
            }
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_OPEN_PAD;
            this.TOKEN_PARAM_PAD_INDEX = index;
        },
        closePad: function(index) {
            if (index === undefined || index === null) {
                throw "Invalid value for mandatory parameter 'index'";
            }
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_CLOSE_PAD;
            this.TOKEN_PARAM_PAD_INDEX = index;
        },
        startSignature: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_START;
            this.TOKEN_PARAM_PAD_ENCRYPTION = "FALSE";

            this.setFieldName = function(fieldName) {
                if (fieldName === undefined || fieldName === null) {
                    throw "'fieldName' is undefined or null";
                }
                this.TOKEN_PARAM_FIELD_NAME = fieldName;
            };

            this.setCustomText = function(customText) {
                if (customText === undefined || customText === null) {
                    throw "'customText' is undefined or null";
                }
                this.TOKEN_PARAM_CUSTOM_TEXT = customText;
            };

            this.setDialogImage = function(dialogImage) {
                if (dialogImage === undefined || dialogImage === null) {
                    throw "'dialogImage' is undefined or null";
                }
                this.TOKEN_PARAM_PAD_DIALOG_IMAGE = dialogImage;
            };

            this.setTextLayout = function (textLayout) {
                if (textLayout === undefined || textLayout === null) {
                    throw "'textLayout' is undefined or null";
                }
                var layout = {};
                layout[Strings.TOKEN_PARAM_LAYOUT_ID] = textLayout.id;
                var textBlocks = [];
                for (var i = 0; i < textLayout.textBlocks.length; i++) {
                    var textBlock = {};
                    textBlock[Strings.TOKEN_PARAM_TEXT] = textLayout.textBlocks[i].text;
                    textBlock[Strings.TOKEN_PARAM_WIDTH] = textLayout.textBlocks[i].width;
                    textBlock[Strings.TOKEN_PARAM_HEIGHT] = textLayout.textBlocks[i].height;
                    textBlock[Strings.TOKEN_PARAM_FONT_NAME] = textLayout.textBlocks[i].fontName;
                    textBlock[Strings.TOKEN_PARAM_FONT_STYLE] = textLayout.textBlocks[i].fontStyle;
                    textBlock[Strings.TOKEN_PARAM_MAX_FONT_SIZE] = textLayout.textBlocks[i].maxFontSize;
                    textBlock[Strings.TOKEN_PARAM_FONT_SIZE_ID] = textLayout.textBlocks[i].fontSizeId;
                    textBlock[Strings.TOKEN_PARAM_CONSTANT] = textLayout.textBlocks[i].constant;
                    textBlocks.push(textBlock);
                }
                layout[Strings.TOKEN_PARAM_TEXT_BLOCKS] = textBlocks;
                this.TOKEN_PARAM_TEXT_LAYOUT = layout;
            };
        },
        cancelSignature: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_CANCEL;
        },
        retrySignature: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_RETRY;
        },
        confirmSignature: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_CONFIRM;
        },
        stopSignature: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_STOP;
        },
        startSelectionDialog: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SELECTION_DIALOG;

            this.addCheckboxInformation = function(cbInformation) {
                if (cbInformation === undefined || cbInformation === null) {
                   throw "'cbInformation' is undefined or null";
                }
                var cbArray = [];
                for (var i = 0; i < cbInformation.length; i++) {
                    var checkbox = {};
                    checkbox[Strings.TOKEN_PARAM_FIELD_ID] = cbInformation[i].id;
                    checkbox[Strings.TOKEN_PARAM_FIELD_TEXT] = cbInformation[i].text;
                    checkbox[Strings.TOKEN_PARAM_FIELD_CHECKED] = cbInformation[i].checked;
                    checkbox[Strings.TOKEN_PARAM_FIELD_REQUIRED] = cbInformation[i].required;
                    cbArray.push(checkbox);
                }
                this.TOKEN_PARAM_FIELD_LIST = cbArray;
            };
        },
        getSignatureData: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA;

            this.setRsaScheme = function (rsaScheme) {
                if (rsaScheme === undefined || rsaScheme === null) {
                    throw "'rsaScheme' is undefined or null";
                }
                this.TOKEN_PARAM_SIGNATURE_RSA_SCHEME = rsaScheme;
            };
        },
        getSignatureImage: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_IMAGE;

            this.setFileType = function(fileType) {
                if (fileType === undefined || fileType === null) {
                    throw "'fileType' is undefined or null";
                }
                this.TOKEN_PARAM_FILE_TYPE = fileType;
            };

            this.setPenWidth = function(penWidth) {
                if (penWidth === undefined || penWidth === null) {
                    throw "'penWidth' is undefined or null";
                }
                this.TOKEN_PARAM_PEN_WIDTH = penWidth;
            };
        },
        getSigningCert: function() {
            this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
            this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNING_CERT;
        }
    };

    context.searchForPads = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SEARCH_FOR_PADS);
    };
    context.openPad = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_OPEN_PAD);
    };
    context.closePad = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_CLOSE_PAD);
    };
    context.startSignature = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_START);
    };
    context.cancelSignature = function() {
        STPadServerLibCommons.send(JSON.stringify(new context.Params.cancelSignature()));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_CANCEL);
    };
    context.retrySignature = function() {
        STPadServerLibCommons.send(JSON.stringify(new context.Params.retrySignature()));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_RETRY);
    };
    context.confirmSignature = function() {
        STPadServerLibCommons.send(JSON.stringify(new context.Params.confirmSignature()));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_CONFIRM);
    };
    context.stopSignature = function() {
        STPadServerLibCommons.send(JSON.stringify(new context.Params.stopSignature()));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_STOP);
    };
    context.startSelectionDialog = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SELECTION_DIALOG);
    };
    context.getSignatureData = function (params) {
        if (params === undefined || params === null) {
            STPadServerLibCommons.send(JSON.stringify(new context.Params.getSignatureData()));
        } else {
            STPadServerLibCommons.send(JSON.stringify(params));
        }
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA);
    };
    context.getSignatureImage = function(params) {
        STPadServerLibCommons.send(JSON.stringify(params));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNATURE_IMAGE);
    };
    context.getSigningCert = function() {
        STPadServerLibCommons.send(JSON.stringify(new context.Params.getSigningCert()));
        return STPadServerLibCommons.createPromise(Strings.TOKEN_CMD_SIGNING_CERT);
    };

    context.handleResponse = function(message, resultObject, intReturnCode) {
        switch (message.TOKEN_CMD_ORIGIN) {
            case Strings.TOKEN_CMD_SEARCH_FOR_PADS:
                var foundPads = [];
                var pads = message[Strings.TOKEN_PARAM_CONNECTED_PADS];
                if (pads) {
                    for (var i = 0; i < pads.length; i++) {
                        var padInfo = {};
                        padInfo.index = pads[i].TOKEN_PARAM_PAD_INDEX;
                        padInfo.type = parseInt(pads[i].TOKEN_PARAM_PAD_TYPE);
                        padInfo.comPort = pads[i].TOKEN_PARAM_PAD_COM_PORT;
                        padInfo.connectionType = pads[i].TOKEN_PARAM_PAD_CONNECTION_TYPE;
                        padInfo.firmwareVersion = pads[i].TOKEN_PARAM_PAD_FIRMWARE_VERSION;
                        padInfo.ipAddress = pads[i].TOKEN_PARAM_PAD_IP_ADDRESS;
                        padInfo.serialNumber = pads[i].TOKEN_PARAM_PAD_SERIAL_NUMBER;
                        padInfo.capabilities = pads[i].TOKEN_PARAM_PAD_CAPABILITIES;
                        foundPads[i] = padInfo;
                    }
                }
                resultObject.foundPads = foundPads;
                break;
            case Strings.TOKEN_CMD_OPEN_PAD:
                var padData = {};
                padData.displayWidth = parseInt(message.TOKEN_PARAM_PAD_DISPLAY_WIDTH);
                padData.displayHeight = parseInt(message.TOKEN_PARAM_PAD_DISPLAY_HEIGHT);
                padData.xResolution = parseInt(message.TOKEN_PARAM_PAD_X_RESOLUTION);
                padData.yResolution = parseInt(message.TOKEN_PARAM_PAD_Y_RESOLUTION);
                padData.samplingRate = parseInt(message.TOKEN_PARAM_PAD_SAMPLING_RATE);
                padData.dialogWidth = parseInt(message.TOKEN_PARAM_PAD_DIALOG_WIDTH);
                padData.dialogHeight = parseInt(message.TOKEN_PARAM_PAD_DIALOG_HEIGHT);
                padData.displayResolution = parseInt(message.TOKEN_PARAM_PAD_DISPLAY_RESOLUTION);
                resultObject.padInfo = padData;
                break;
            case Strings.TOKEN_CMD_SIGNATURE_CONFIRM:
                resultObject.countedPoints = intReturnCode;
                break;
            case Strings.TOKEN_CMD_SIGNATURE_START:
            case Strings.TOKEN_CMD_SELECTION_DIALOG:
            case Strings.TOKEN_CMD_SIGNATURE_CANCEL:
            case Strings.TOKEN_CMD_CLOSE_PAD:
            case Strings.TOKEN_CMD_SIGNATURE_RETRY:
                // no further information in response here
                break;
            case Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA:
                resultObject.signData = message.TOKEN_PARAM_SIGNATURE_SIGN_DATA;
                resultObject.certId = message.TOKEN_PARAM_CERT_ID;
                resultObject.rsaSignature = message.TOKEN_PARAM_SIGNATURE_RSA_SIGNATURE;
                break;
            case Strings.TOKEN_CMD_SIGNATURE_IMAGE:
                resultObject.file = message.TOKEN_PARAM_FILE;
                break;
            case Strings.TOKEN_CMD_SIGNING_CERT:
                resultObject.signingCert = message.TOKEN_PARAM_SIGNING_CERT;
                break;
            default:
                return null;
        }
        return resultObject;
    }

    context.handleSendEvent = function(message) {
        switch (message.TOKEN_CMD) {
            case Strings.TOKEN_CMD_SIGNATURE_POINT:
                var x = parseInt(message.TOKEN_PARAM_POINT["x"]);
                var y = parseInt(message.TOKEN_PARAM_POINT["y"]);
                var p = parseInt(message.TOKEN_PARAM_POINT["p"]);
                STPadServerLibCommons.handleNextSignaturePoint(x, y, p);
                break;
            case Strings.TOKEN_CMD_SIGNATURE_CANCEL:
                context.handleCancelSignature();
                break;
            case Strings.TOKEN_CMD_SIGNATURE_RETRY:
                context.handleRetrySignature();
                break;
            case Strings.TOKEN_CMD_SIGNATURE_CONFIRM:
                context.handleConfirmSignature();
                break;
            case Strings.TOKEN_CMD_SELECTION_CANCEL:
                context.handleCancelSelection();
                break;
            case Strings.TOKEN_CMD_SELECTION_CONFIRM:
                context.handleConfirmSelection();
                break;
            case Strings.TOKEN_CMD_DISCONNECT:
                STPadServerLibCommons.handleDisconnect(message.TOKEN_PARAM_PAD_INDEX);
                break;
            case Strings.TOKEN_CMD_SELECTION_CHANGE:
                context.handleSelectionChange(message.TOKEN_PARAM_FIELD_ID, message.TOKEN_PARAM_FIELD_CHECKED);
                break;
            case Strings.TOKEN_CMD_ERROR:
                context.handleError(message.TOKEN_PARAM_ERROR_CONTEXT, parseInt(message.TOKEN_PARAM_RETURN_CODE),
                    message.TOKEN_PARAM_ERROR_DESCRIPTION);
                break;
            default:
                return null;
        }
        return "found";
    }
})(STPadServerLibDefault);
