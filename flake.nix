{
  inputs.nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

  outputs = { self, nixpkgs }: let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
    serve = pkgs.writeShellScriptBin "serve" ''
      CORS=true ${pkgs.deno}/bin/deno run \
        --allow-net \
        --allow-env \
        --allow-read $@
    '';
  in {
    devShells.x86_64-linux.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        deno
        nodejs
        serve
      ];
    };
  };
}
