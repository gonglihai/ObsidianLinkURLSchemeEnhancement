import { Plugin } from "obsidian";
import { resolveCommand, resolveEditor, runCommand } from "./command";
import { Editors } from "./config";

export default class URLSchemeEnhancementPlugin extends Plugin {
	async onload() {
		// a标签点击事件处理
		this.registerMarkdownPostProcessor((element) => {
			// 查找 a 标签, 添加事件拦截
			const links = element.querySelectorAll('a.external-link');
			links.forEach((link: HTMLLinkElement) => {
				link.addEventListener('click', (event) => {
					const command = resolveCommand(link.href);
					if (command) {
						runCommand(command);
						event.preventDefault();
						event.stopPropagation();
					}
				})
			})
		})

		// a标签上下文菜单(右键菜单)
		this.registerEvent(
			this.app.workspace.on("url-menu", (menu, url: string) => {
				// 解析 url 找到 编辑器, 添加选项菜单
				const eidtor = resolveEditor(url);
				const eidtors = eidtor ? [eidtor] : Editors;

				eidtors.forEach((editor) => {
					menu.addItem((item) => {
						item.setTitle(`用 ${editor.name} 打开`)
							.setIcon(editor.icon ? editor.icon : 'code')
							.onClick(async () => {
								const command = resolveCommand(url, editor)!;
								runCommand(command);
							});
					});
				})
			})
		);
	}

}
