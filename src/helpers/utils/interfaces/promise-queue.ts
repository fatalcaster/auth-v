import { List } from "./linked-list";

interface QueuedPromise<T> {
  promiseRunner: () => Promise<T>;
  resolve: (data: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

class PromiseQueue {
  // Allow for any type of promise to be queued here
  private commands: {
    [channel: string]: {
      queue: List<QueuedPromise<any>>;
      running: boolean;
    };
  };

  // Remove promises if the queue is too full
  private maxLength?: number;

  public constructor(maxLength?: number) {
    this.commands = {};
    this.maxLength = maxLength;
  }

  public enqueue<T>(id: string, promiseRunner: () => Promise<T>): Promise<T> {
    if (!this.commands[id]) {
      this.commands[id] = {
        running: false,
        queue: new List(),
      };
    }
    return new Promise((resolve, reject) => {
      // Only allow for at most 'n' promises on the stack
      if (this.maxLength && this.commands[id].queue.length >= this.maxLength) {
        this.commands[id].queue
          .pop()
          ?.reject("Stack grew too full, dumping old promises");
      }

      // Push this new promise onto the stack
      this.commands[id].queue.push({
        promiseRunner,
        resolve,
        reject,
      });

      // Immediately attempt to dequeue this promise, which will resolve
      // it if successful
      this.dequeue(id);
    });
  }

  private dequeue(id: string): void {
    // If another promise is running, don't run this one yet
    if (this.commands[id].running) return;

    const queued = this.commands[id].queue.pop();
    // If there are no more promises, return
    if (!queued) return;

    this.commands[id].running = true;
    queued
      .promiseRunner()
      .then(queued.resolve)
      .catch(queued.reject)
      .finally(() => {
        // Attempt to run next in queue
        this.commands[id].running = false;
        this.dequeue(id);
      });
  }
}

const promiseQueue = new PromiseQueue();

export { promiseQueue };
