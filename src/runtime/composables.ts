import type { ClassInjectInstance } from "./types";
import { useState } from "#imports";

export const useClassInject = () => {
  return useState("class-inject").value as ClassInjectInstance;
};
