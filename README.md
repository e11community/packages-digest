# packages-digest

Create a digest from a list of packages (name@version)

## Usage

```yaml
steps:
  - id: auth
    name: GCP Auth
    uses: google-github-actions/auth@v2
    with:
      credentials_json: ${{ secrets.GCP_SA_KEY }}
      project_id: ${{ inputs.project_id }}
  - id: docker_auth_gcp
    name: Docker Auth GCP
    uses: docker/login-action@v3
    with:
      registry: us-central1-docker.pkg.dev/${{ inputs.project_id }}/builders
      username: _json_key
      password: ${{ secrets.GCP_SA_KEY }}
  - id: packages_digest
    name: Packages Digest
    uses: e11community/packages-digest
    with:
      packages: |
        node@22
        pnpm@10.4.1
  - id: image_exists
    name: Image Exists
    uses: e11community/image-exists
    with:
    tag: us-central1-docker.pkg.dev/${{ inputs.project_id }}/builders/pnpm@${{ steps.packages_digest.outputs.digest}}
  - id: aftermath
    run: |
      echo 'Exists? ${{ steps.image_exists.outputs.exists }}'
```
