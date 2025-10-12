export const VIRTUAL_ROOT = '/virtual-root';
export const VIRTUAL_ROOT_UNRESOLVED = '/virtual-root-unresolved';

export function handleResolveRequestError({ error, context, platform, moduleName }) {
  console.warn(`Failed to resolve module: ${moduleName}`, error);
  return context.resolveRequest(context, moduleName, platform);
}