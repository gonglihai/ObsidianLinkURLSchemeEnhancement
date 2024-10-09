export interface Editor {
	prefix: string,
	name: string,
	path: string,
	icon?: string
}

export interface URLSchemeEnhancementSettings {
	URLSchemes: Editor[];
}

export interface Command {
	command: string,
	args: string[]
}