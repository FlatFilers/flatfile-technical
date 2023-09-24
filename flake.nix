{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";

  };
  outputs = { self, nixpkgs, flake-utils, pre-commit-hooks}:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          overlays = [];
          pkgs = import nixpkgs 
          {
            inherit system overlays;
          };
          checks = {
          pre-commit-check = pre-commit-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              nil.enable = true;
              prettier.enable = true;
              convco.enable = true;
            };
          };
        };
        in
        with pkgs;
        {
          devShells.default = mkShell {
           inherit (checks.pre-commit-check) shellHook;

            buildInputs = [ pkgs.nodejs ];
          };
        }
      );
}