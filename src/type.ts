export interface Editor {
	prefix: string,
	name: string,
	path: string,
	icon?: string
}

export interface URLSchemeEnhancementSettings {
  URLSchemes: Editor[];
}