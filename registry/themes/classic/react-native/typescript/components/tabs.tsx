import { Pressable, Text, View, StyleSheet } from 'react-native';

import type { ReactNode } from 'react';
type Props = {
	children?: ReactNode;
	label?: string;
	title?: string;
	initials?: string;
	value?: string;
	placeholder?: string;
	width?: number | string;
	height?: number | string;
	page?: number;
	disabled?: boolean;
	checked?: boolean;
	open?: boolean;
	required?: boolean;
	removable?: boolean;
	onPress?: () => void;
	onChangeText?: (value: string) => void;
};

export function Tabs({ label, onPress, children }: Props) {
	const s = styles;
	return (
		<View>
			<View style={s.row}>
				<Pressable onPress={onPress} style={s.button}>
					<Text style={s.buttonText}>{label || 'Overview'}</Text>
				</Pressable>
				<Pressable onPress={onPress} style={s.outline}>
					<Text style={s.copy}>Details</Text>
				</Pressable>
			</View>
			<View style={s.surface}>
				<Text style={s.copy}>{children || 'Selected tab content'}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 44,
		paddingHorizontal: 18,
		borderRadius: 8,
		backgroundColor: '#00a3a3',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: { color: '#0f2a43', fontWeight: '700' },
	outline: {
		minHeight: 40,
		paddingHorizontal: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#d9e1e7',
		justifyContent: 'center',
	},
	field: {
		minHeight: 42,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: '#d9e1e7',
		borderRadius: 8,
		color: '#0f2a43',
	},
	textarea: { minHeight: 100, textAlignVertical: 'top' },
	surface: {
		padding: 16,
		borderWidth: 1,
		borderColor: '#d9e1e7',
		borderRadius: 10,
		backgroundColor: 'white',
		gap: 10,
	},
	title: { color: '#0f2a43', fontSize: 15, fontWeight: '700' },
	copy: { color: '#526575', fontSize: 13 },
	label: { color: '#0f2a43', fontWeight: '600', marginBottom: 6 },
	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 20,
		backgroundColor: '#e4f5f5',
		alignSelf: 'flex-start',
	},
	pillText: { color: '#0f2a43', fontWeight: '600', fontSize: 12 },
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#e4f5f5',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarText: { color: '#0f2a43', fontWeight: '700' },
	check: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: '#9cabb6',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checked: { backgroundColor: '#00a3a3', borderColor: '#00a3a3' },
	checkText: { color: '#0f2a43', fontSize: 12 },
	row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
	disabled: { opacity: 0.5 },
	scrim: { flex: 1, backgroundColor: '#0006', justifyContent: 'center', padding: 24 },
	spinner: { color: '#00a3a3' },
	separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#d9e1e7', width: '100%' },
	skeleton: { borderRadius: 6, backgroundColor: '#e8edf0' },
});
