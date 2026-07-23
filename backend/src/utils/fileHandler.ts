import { readFile, writeFile } from "fs/promises";

// O <T> permite que a função trabalhe com qualquer tipo de dado (Product[], User[], etc.)
export const readDatabase = async <T>(filePath: string): Promise<T[]> => {
  try {
    const data = await readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(data) as T[];
  } catch (error) {
    return [];
  }
};

export const writeDatabase = async <T>(
  filePath: string,
  data: T[],
): Promise<void> => {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};
