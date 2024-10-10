export const logError = (context: string, error: unknown) => {
  console.error(`Error in ${context}:`, error);
  if (error instanceof Error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
  } else {
    console.error('Unknown error type:', typeof error);
  }
};