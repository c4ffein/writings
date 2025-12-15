# ============================================================================
# WRITINGS - Build System
# ============================================================================
#
# Architecture:
#   This repo serves two purposes:
#   1. GitHub browsing - raw markdown in s/, clean and readable, git history intact
#   2. Blog at writings.cafine.dev - polished static site via Zola
#
# Why this setup?
#   - Source markdown stays clean (no frontmatter) for GitHub preview
#   - articles.toml defines metadata separately
#   - generate.py injects frontmatter and outputs to zola/content/posts/
#   - Same content, two presentations
#
# SEO notes:
#   - All links use absolute URLs to production (writings.cafeine.dev)
#   - Canonical tags point to production
#   - robots.txt blocks staging, robots-prod.txt allows indexing
#   - Deploy script should copy robots-prod.txt to robots.txt on prod
#
# Requirements: zola, python3.11+, Linux (for serve-public)
# ============================================================================

ZOLA_VERSION := 0.19.2
ZOLA_URL := https://github.com/getzola/zola/releases/download/v$(ZOLA_VERSION)/zola-v$(ZOLA_VERSION)-x86_64-unknown-linux-gnu.tar.gz

.PHONY: help install generate serve serve-public build clean

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install       Install Zola to ~/.local/bin (Linux x86_64)"
	@echo "  serve         Serve locally on localhost:1111"
	@echo "  serve-public  Serve on LAN IP (Linux only)"
	@echo "  build         Build static site to zola/public/"
	@echo "  generate      Generate Zola content from s/ articles"
	@echo "  clean         Remove generated content"
	@echo "  help          Show this help"
	@echo ""
	@echo "See top of Makefile for architecture docs."

install:
	@if [ -f "$$HOME/.local/bin/zola" ]; then \
		echo "Zola already installed at ~/.local/bin/zola:"; \
		$$HOME/.local/bin/zola --version; \
		echo "Aborting."; \
		exit 1; \
	fi
	@echo "This will:"
	@echo "  1. Download Zola $(ZOLA_VERSION) to /tmp"
	@echo "  2. Extract and install to ~/.local/bin/zola"
	@echo ""
	@echo "Make sure ~/.local/bin is in your PATH."
	@echo ""
	@read -p "Continue? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "Downloading Zola $(ZOLA_VERSION)..."
	curl -sL "$(ZOLA_URL)" -o /tmp/zola.tar.gz
	tar -xzf /tmp/zola.tar.gz -C /tmp
	mkdir -p "$$HOME/.local/bin"
	mv /tmp/zola "$$HOME/.local/bin/zola"
	chmod +x "$$HOME/.local/bin/zola"
	rm /tmp/zola.tar.gz
	@echo "Done! Installed:"
	$$HOME/.local/bin/zola --version

generate:
	python3 zola/scripts/generate.py

serve: generate
	cd zola && zola serve

serve-public: generate
	@[ "$$(uname)" = "Linux" ] || { echo "Requires Linux"; exit 1; }
	$(eval IP := $(shell hostname -I | awk '{print $$1}'))
	@echo "Serving on http://$(IP):1111"
	cd zola && zola serve -i $(IP) -u http://$(IP)

build: generate
	cd zola && zola build

clean:
	rm -rf zola/content/posts/*.md zola/public/
