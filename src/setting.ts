import { App, PluginSettingTab, Setting } from "obsidian";
import URLSchemeEnhancementPlugin from "./main";

export class URLSchemeEnhancementSettingTab extends PluginSettingTab {
  plugin: URLSchemeEnhancementPlugin;

  constructor(app: App, plugin: URLSchemeEnhancementPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    this.plugin.settings.URLSchemes.forEach((URLScheme, index) => {
      const editorEl = containerEl.createEl('div', { cls: 'editor-setting' });

      new Setting(editorEl)
        .setName(`Editor ${index + 1}`)
        .addText(text => text
          .setPlaceholder('Prefix')
          .setValue(URLScheme.prefix)
          .onChange(async (value) => {
            this.plugin.settings.URLSchemes[index].prefix = value;
            await this.plugin.saveSettings();
          })
        )
        .addText(text => text
          .setPlaceholder('Name')
          .setValue(URLScheme.name)
          .onChange(async (value) => {
            this.plugin.settings.URLSchemes[index].name = value;
            await this.plugin.saveSettings();
          })
        )
        .addText(text => text
          .setPlaceholder('Path')
          .setValue(URLScheme.path)
          .onChange(async (value) => {
            this.plugin.settings.URLSchemes[index].path = value;
            await this.plugin.saveSettings();
          })
        )
        .addText(text => text
          .setPlaceholder('Icon (optional)')
          .setValue(URLScheme.icon || '')
          .onChange(async (value) => {
            this.plugin.settings.URLSchemes[index].icon = value || undefined;
            await this.plugin.saveSettings();
          })
        )
        .addButton(button => button
          .setButtonText('Remove')
          .setCta()
          .onClick(async () => {
            this.plugin.settings.URLSchemes.splice(index, 1);
            await this.plugin.saveSettings();
            this.display(); // Refresh settings panel
          })
        );
    })

    // Add new editor
    new Setting(containerEl)
    .setName('Add New Editor')
    .addButton(button => button
        .setButtonText('Add Editor')
        .setCta()
        .onClick(async () => {
            this.plugin.settings.URLSchemes.push({
                prefix: '',
                name: '',
                path: '',
                icon: ''
            });
            await this.plugin.saveSettings();
            this.display(); // Refresh settings panel
        })
    );
  }
}