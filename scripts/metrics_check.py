
import os

def get_metrics(startpath):
    metrics = {
        'total_files': 0,
        'total_dirs': 0,
        'loc': {},
        'agents_found': [],
        'structure_check': {
            'agents': False,
            'antigravity_system': False,
            'config': False,
            'utils': False,
            'main.py': False,
            'requirements.txt': False
        }
    }
    
    required_agents = [
        'agent_frontend_backend.py',
        'agent_security.py',
        'agent_software_design.py',
        'agent_error_handler.py'
    ]
    
    for root, dirs, files in os.walk(startpath):
        rel_path = os.path.relpath(root, startpath)
        
        if rel_path == '.':
            metrics['total_dirs'] = len(dirs)
            for d in dirs:
                if d in metrics['structure_check']:
                    metrics['structure_check'][d] = True
            for f in files:
                if f in metrics['structure_check']:
                    metrics['structure_check'][f] = True
        
        if 'agents' in root:
            for f in files:
                if f in required_agents:
                    metrics['agents_found'].append(f)
        
        for f in files:
            metrics['total_files'] += 1
            ext = os.path.splitext(f)[1]
            if ext in ['.py', '.js', '.txt', '.md', '.css']:
                try:
                    with open(os.path.join(root, f), 'r', encoding='utf-8') as file:
                        lines = len(file.readlines())
                        metrics['loc'][ext] = metrics['loc'].get(ext, 0) + lines
                except:
                    pass
    
    return metrics

path = r"c:\Users\VALENTIN\Desktop\ANTIGRAVITY\PROYECTOS LISTOS\Seguridad Digital + Programación desde Cero\antigravity_system_IA_agents"
m = get_metrics(path)

print(f"Metrics for: {path}")
print(f"Total Files: {m['total_files']}")
print(f"Total Dirs: {m['total_dirs']}")
print("\nLOC by extension:")
for ext, count in m['loc'].items():
    print(f"  {ext}: {count}")

print("\nStructure Check:")
for item, found in m['structure_check'].items():
    print(f"  {item}: {'OK' if found else 'MISSING'}")

print("\nAgents Found:")
for agent in m['agents_found']:
    print(f"  - {agent}")

missed = set([
    'agent_frontend_backend.py',
    'agent_security.py',
    'agent_software_design.py',
    'agent_error_handler.py'
]) - set(m['agents_found'])

if missed:
    print("\nMissing Agents:")
    for m_agent in missed:
        print(f"  - {m_agent}")
else:
    print("\nAll 4 Agents Present: OK")
