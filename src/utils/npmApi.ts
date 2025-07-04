interface NpmRegistryPackage {
  name: string;
  description: string;
}

interface NpmRegistryResult {
  package: NpmRegistryPackage;
}

interface NpmRegistryResponse {
  objects: NpmRegistryResult[];
}

export const searchNpmPackages = async (query: string): Promise<NpmRegistryPackage[]> => {
  const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}`);
  const data: NpmRegistryResponse = await res.json();
  return data.objects.map(obj => obj.package);
};
