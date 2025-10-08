import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

const TASK_NAME = "LOCKIN_INACTIVITY";

TaskManager.defineTask(TASK_NAME, async () => {
try {
// check last active timestamp from storage and create recovery suggestions
return BackgroundFetch.BackgroundFetchResult.NewData;
} catch (e) {
return BackgroundFetch.BackgroundFetchResult.Failed;
}
});

export async function registerTasks() {
await BackgroundFetch.registerTaskAsync(TASK_NAME, { minimumInterval: 60 * 60 * 6 });
}

