'use strict';

import { ServiceBusProvider } from './providers/serviceBusProvider';
import { NameSpace } from './namespace/namespace';
import { MessageProvider } from './providers/messageProvider';
import registerCommands from './commands';
import { IDisposable } from './disposable';
import { ExtensionContext, window, workspace } from 'vscode';
import { SubscriptionUI } from './topic/SubscriptionUI';
import { SendToBus } from './messages/sendToBus';

export function activate(context: ExtensionContext) {

	const serviceBusProvider = new ServiceBusProvider(context);
	const nameSpace = new NameSpace(context);
	const sendToBus = new SendToBus(context);
	const subscriptionUI = new SubscriptionUI(context);
	const messageProvider = new MessageProvider();

	const disposables: IDisposable[] = [];
	
	disposables.push(window.registerTreeDataProvider('servicebus-namespaces', serviceBusProvider));
	disposables.push(workspace.registerTextDocumentContentProvider('servicebusmessage', messageProvider));
	disposables.push(...registerCommands(context, serviceBusProvider, nameSpace, subscriptionUI, sendToBus));	

	context.subscriptions.push(...disposables);
}

export function deactivate() { }