export const VIRTUAL_ROOT = '/virtual-root';
export const VIRTUAL_ROOT_UNRESOLVED = '/virtual-root-unresolved';

export function handleResolveRequestError({ error, context, platform, moduleName }) {
  console.warn(`Failed to resolve module: ${moduleName}`, error);
  
  // Try to resolve with fallback strategies
  try {
    // First attempt: standard resolution
    return context.resolveRequest(context, moduleName, platform);
  } catch (fallbackError) {
    console.warn(`Fallback resolution failed for: ${moduleName}`, fallbackError);
    
    // Return null to indicate resolution failure
    // This prevents the app from crashing on module resolution errors
    return null;
  }
}