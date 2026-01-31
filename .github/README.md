# PECE GitHub Actions CI/CD Configuration

This repository includes comprehensive GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to main branches:

- **Code Quality**: PHP CodeSniffer with Drupal standards, Rector checks
- **Security**: Composer security audit
- **Tests**: PHPUnit, Codeception (unit/functional), Behat behavioral tests
- **Build**: Theme asset compilation and validation

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

Handles deployments to staging and production:

- **Staging**: Automatic deployment on main branch pushes
- **Production**: Manual deployment via workflow dispatch
- Creates deployment artifacts with optimized builds

### 3. Dependencies Workflow (`.github/workflows/dependencies.yml`)

Weekly automated dependency updates:

- Updates Composer and npm dependencies
- Runs security audits
- Creates pull requests with changes

### 4. Performance Workflow (`.github/workflows/performance.yml`)

Performance monitoring and testing:

- **Lighthouse CI**: Web performance, accessibility, SEO audits
- **Load Testing**: Apache Bench stress testing (manual trigger)

## Setup Requirements

### Repository Secrets

Configure these secrets in your GitHub repository settings:

```
# For deployment (if using SSH)
STAGING_HOST=your-staging-server.com
STAGING_USER=deploy-user
STAGING_SSH_KEY=-----BEGIN PRIVATE KEY-----...

PRODUCTION_HOST=your-production-server.com
PRODUCTION_USER=deploy-user
PRODUCTION_SSH_KEY=-----BEGIN PRIVATE KEY-----...

# For Lighthouse CI (optional)
LHCI_GITHUB_APP_TOKEN=your-lighthouse-token
```

### Environment Protection

1. Go to Settings → Environments
2. Create `staging` and `production` environments
3. Add protection rules for production (require reviews, restrict branches)

## Local Development Integration

The workflows are designed to work alongside DDEV:

```bash
# Run the same checks locally
ddev composer install
ddev exec ./vendor/bin/phpcs --standard=Drupal web/profiles/pece/modules/
ddev exec ./vendor/bin/phpunit --configuration web/core/phpunit.xml.dist
ddev exec ./vendor/bin/behat
```

## Customization

### Adding Custom Tests

Add test files to appropriate directories:
- PHPUnit: `web/profiles/pece/modules/*/tests/`
- Codeception: `tests/`
- Behat: `features/`

### Modifying Deployment

Update the deployment steps in `deploy.yml` based on your hosting setup:
- SSH deployment example provided
- Adapt for your specific deployment method (rsync, FTP, cloud providers)

### Performance Thresholds

Adjust Lighthouse thresholds in `lighthouserc.js`:
- Performance: Currently set to 70%
- Accessibility: 90%
- Best Practices: 80%
- SEO: 80%

## Monitoring

- Check the Actions tab for workflow runs
- Review performance reports from Lighthouse CI
- Monitor dependency update PRs for security issues

## Troubleshooting

### Common Issues

1. **Memory Issues**: Increase `COMPOSER_MEMORY_LIMIT` if needed
2. **Test Timeouts**: Adjust service health check intervals
3. **Asset Build Failures**: Ensure all themes have proper build scripts

### Debug Mode

Add this step to any workflow for debugging:

```yaml
- name: Debug
  run: |
    echo "PHP Version: $(php -v)"
    echo "Composer Version: $(composer --version)"
    echo "Node Version: $(node -v)"
    echo "Current Directory: $(pwd)"
    ls -la
```
