import { Hotkey, KeyboardModifiers } from './types'

const reservedModifierKeywords = ['shift', 'alt', 'meta', 'mod', 'ctrl', 'control']

const mappedKeys: Record<string, string> = {
  esc: 'escape',
  return: 'enter',
  left: 'arrowleft',
  right: 'arrowright',
  up: 'arrowup',
  down: 'arrowdown',
  ShiftLeft: 'shift',
  ShiftRight: 'shift',
  AltLeft: 'alt',
  AltRight: 'alt',
  MetaLeft: 'meta',
  MetaRight: 'meta',
  OSLeft: 'meta',
  OSRight: 'meta',
  ControlLeft: 'ctrl',
  ControlRight: 'ctrl',
}

export function mapCode(key: string): string {
  return (mappedKeys[key.trim()] || key.trim()).toLowerCase().replace(/key|digit|numpad/, '')
}

export function isHotkeyModifier(key: string) {
  return reservedModifierKeywords.includes(key)
}

export function parseKeysHookInput(keys: string, delimiter = ','): string[] {
  return keys.toLowerCase().split(delimiter)
}

export function parseHotkey(hotkey: string, splitKey = '+', useKey = false, description?: string): Hotkey {
  const keys = hotkey
    .toLocaleLowerCase()
    .split(splitKey)
    .map((k) => mapCode(k))

  const modifiers: KeyboardModifiers = {
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl') || keys.includes('control'),
    shift: keys.includes('shift'),
    meta: keys.includes('meta'),
    mod: keys.includes('mod'),
    useKey,
  }

  const singleCharKeys = keys.filter((k) => !reservedModifierKeywords.includes(k))

  return {
    ...modifiers,
    keys: singleCharKeys,
    description,
  }
}
