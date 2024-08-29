import { exec } from 'child_process';
import { Editor } from './type';
import { Notice } from 'obsidian';
import { Editors } from './config';

/**
 * 解析 url
 * @param url url
 * @param prefix 要移除的前缀, 例如 "file://"
 * @returns 
 */
export function resolveParams(url: string, prefix?: string) {
  // 将 反斜杠 "\" 替换成 斜杠 "/"
  url = url.replace(/%5C/g, '/');

  // 移除 "file://" 前缀
  if (url.startsWith("file://")) {
    return url.substring("file://".length);
  }
  // 其它编辑器自定义前缀
  if (prefix && url.startsWith(prefix)) {
    url = url.substring(prefix.length)
  }
  return url;
}

/**
 * 解析命令
 * @param url url
 * @param editor 指定的编辑器
 * @returns 如果指定了 编辑器, 返回不会返回 undefined; 如果未指定, 调用 resolveEditor 解析, 解析为 undefined 则返回 undefined
 */
export function resolveCommand(url: string, editor?: Editor) {
  if (!editor) {
    editor = resolveEditor(url);
  }
  if (!editor) {
    return undefined;
  }
  const params = resolveParams(url, editor.prefix)
  return `"${editor.path}" "${params}"`
}

/**
 * 通过 url 前缀匹配编辑器
 * @param url url
 * @returns 编辑器
 */
export function resolveEditor(url: string) {
  for (const Editor of Editors) {
    if (url.startsWith(Editor.prefix)) {
      return Editor;
    }
  }
  return undefined;
}

/**
 * 执行命令
 * @param command 命令
 */
export function runCommand(command: string) {
  console.log('command', command)
  exec(command, (error) => {
    if (error) {
      console.log('执行失败, command: ', command, error)
      new Notice('打开失败, error: ' + error);
      return;
    }
  })
}