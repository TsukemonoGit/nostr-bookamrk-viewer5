import { nip19 } from 'nostr-tools';
import type { AddressPointer } from 'nostr-tools/lib/types/nip19';
//import { pubkey } from '$lib/stores/settings';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
//https://kit.svelte.jp/docs/load
//ページを読み込む前に有効なparamかチェック

export const load: PageLoad<{
	pubkey: string;
	kind: number;
	identifier: string;
	relays?: string[];
}> = ({ params }) => {
	console.log(params.naddr);
	try {
		const { type, data } = nip19.decode(params.naddr);
		console.log('[decode]', type, data);
		//AddressPointer
		const address = data as AddressPointer;
		//pubkey.set(address.pubkey);
		return {
			pubkey: address.pubkey,
			kind: address.kind,
			identifier: address.identifier,
			relays: address.relays ? address.relays : []
		};
	} catch (e) {
		console.error('[npub decode error]', e);
		throw error(404, 'Not Found');
	}
};