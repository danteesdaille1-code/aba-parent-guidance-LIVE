'use client';

// BIP Template - Matching Reference PDF Exactly

interface BIPTemplatePlan {
  childName: string;
  dateCreated: string;
  dateOfBirth: string;
  targetBehavior: string;
  behaviorFunctions: {
    attention: boolean;
    escape: boolean;
    sensory: boolean;
    tangible: boolean;
  };
  settingEvent: string;
  precursor: string;
  restrictions: string;
  reinforcers: string;
  replacementBehaviors: string[];
  antecedentStrategies: string[];
  teachingStrategies: string[];
  consequenceStrategies: string[];
  notes: string;
}

interface BIPTemplateProps {
  plan: BIPTemplatePlan;
}

export default function BIPTemplate({ plan }: BIPTemplateProps) {
  // Format function display as text
  const getFunctionsText = () => {
    const functions = [];
    if (plan.behaviorFunctions.attention) functions.push('Attention');
    if (plan.behaviorFunctions.escape) functions.push('Escape');
    if (plan.behaviorFunctions.tangible) functions.push('Tangible');
    if (plan.behaviorFunctions.sensory) functions.push('Sensory');
    return functions.length > 0 ? functions.join(' | ') : 'Attention | Escape | Tangible | Sensory (circle all that apply)';
  };

  // Colors from reference template - EXACT values from BIP_Template (1).pdf
  const colors = {
    brown: '#C89968',      // EXACT: RGB(200, 153, 104) - Warm golden brown
    teal: '#5B8A94',       // EXACT: RGB(91, 138, 148) - Rich blue-teal
    cream: '#F5F3EE',      // EXACT: RGB(245, 243, 238) - Light cream
    white: '#FFFFFF',      // EXACT: RGB(255, 255, 255)
    labelBrown: '#C89968', // EXACT: Same as brown headers
    textDark: '#595959',   // EXACT: RGB(89, 89, 89) - Dark gray
    lightItalic: '#999999' // EXACT: RGB(153, 153, 153) - Medium gray
  };

  return (
    <>
      {/* Print-specific styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 20px;
            }
            .no-print {
              display: none !important;
            }
          }
        `
      }} />

      <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '8.5in',
        margin: '0 auto',
        padding: '0.5in',
        backgroundColor: colors.cream
      }}>

        {/* Title Header */}
        <div style={{
          backgroundColor: colors.brown,
          padding: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: colors.white,
            fontSize: '18pt',
            fontWeight: 'bold',
            margin: 0
          }}>
            Personalized Parent Guide
          </h1>
        </div>

        {/* Child Information Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <thead>
            <tr>
              <th colSpan={2} style={{
                backgroundColor: colors.brown,
                color: colors.white,
                padding: '10px',
                textAlign: 'left',
                fontSize: '13pt',
                fontWeight: 'bold'
              }}>
                Child Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                width: '30%',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt'
              }}>
                Child's Name:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.textDark
              }}>
                {plan.childName || ''}
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt'
              }}>
                Date Created:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.textDark
              }}>
                {plan.dateCreated || ''}
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt'
              }}>
                Date of Birth:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.textDark
              }}>
                {plan.dateOfBirth || ''}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Target Behavior Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <thead>
            <tr>
              <th colSpan={2} style={{
                backgroundColor: colors.brown,
                color: colors.white,
                padding: '10px',
                textAlign: 'left',
                fontSize: '13pt',
                fontWeight: 'bold'
              }}>
                Target Behavior
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                width: '30%',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt',
                verticalAlign: 'top'
              }}>
                Behavior:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: plan.targetBehavior ? colors.textDark : colors.lightItalic,
                fontStyle: plan.targetBehavior ? 'normal' : 'italic'
              }}>
                {plan.targetBehavior || 'Define the specific behavior in observable, measurable terms.'}
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt',
                verticalAlign: 'top'
              }}>
                Function(s):
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.lightItalic,
                fontStyle: 'italic'
              }}>
                {getFunctionsText()}
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt',
                verticalAlign: 'top'
              }}>
                Setting Event:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: plan.settingEvent ? colors.textDark : colors.lightItalic,
                fontStyle: plan.settingEvent ? 'normal' : 'italic'
              }}>
                {plan.settingEvent || 'Conditions that make behavior more likely (e.g., poor sleep, hunger, schedule changes)'}
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: colors.labelBrown,
                fontWeight: 'bold',
                fontSize: '8pt',
                verticalAlign: 'top'
              }}>
                Precursor:
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                color: plan.precursor ? colors.textDark : colors.lightItalic,
                fontStyle: plan.precursor ? 'normal' : 'italic'
              }}>
                {plan.precursor || 'Warning signs before the behavior (e.g., whining, pacing, verbal refusal)'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Restrictions & Reinforcers Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <thead>
            <tr>
              <th colSpan={2} style={{
                backgroundColor: colors.brown,
                color: colors.white,
                padding: '10px',
                textAlign: 'left',
                fontSize: '13pt',
                fontWeight: 'bold'
              }}>
                Restrictions & Reinforcers
              </th>
            </tr>
            <tr>
              <th style={{
                backgroundColor: colors.teal,
                color: colors.white,
                padding: '8px',
                textAlign: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                width: '50%'
              }}>
                Restrictions
              </th>
              <th style={{
                backgroundColor: colors.teal,
                color: colors.white,
                padding: '8px',
                textAlign: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                width: '50%'
              }}>
                Reinforcers
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top',
                minHeight: '100px',
                color: plan.restrictions ? colors.textDark : colors.lightItalic,
                fontStyle: plan.restrictions ? 'normal' : 'italic'
              }}>
                {plan.restrictions || 'Items, activities, or situations to avoid or limit'}
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top',
                minHeight: '100px',
                color: plan.reinforcers ? colors.textDark : colors.lightItalic,
                fontStyle: plan.reinforcers ? 'normal' : 'italic'
              }}>
                {plan.reinforcers || 'Preferred items, activities, or praise that motivate the child'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Intervention Strategies Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <thead>
            <tr>
              <th colSpan={3} style={{
                backgroundColor: colors.brown,
                color: colors.white,
                padding: '10px',
                textAlign: 'left',
                fontSize: '13pt',
                fontWeight: 'bold'
              }}>
                Intervention Strategies
              </th>
            </tr>
            <tr>
              <th style={{
                backgroundColor: colors.teal,
                color: colors.white,
                padding: '8px',
                textAlign: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                width: '33.33%'
              }}>
                Antecedent / Prevention<br />Strategies
              </th>
              <th style={{
                backgroundColor: colors.teal,
                color: colors.white,
                padding: '8px',
                textAlign: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                width: '33.33%'
              }}>
                Replacement Behaviors<br />to Teach
              </th>
              <th style={{
                backgroundColor: colors.teal,
                color: colors.white,
                padding: '8px',
                textAlign: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                width: '33.33%'
              }}>
                Consequential<br />Responses
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top',
                color: colors.lightItalic,
                fontStyle: 'italic',
                fontSize: '8pt'
              }}>
                What to do BEFORE the behavior to prevent it
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top',
                color: colors.lightItalic,
                fontStyle: 'italic',
                fontSize: '8pt'
              }}>
                Appropriate alternative behaviors to teach instead
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top',
                color: colors.lightItalic,
                fontStyle: 'italic',
                fontSize: '8pt'
              }}>
                How to respond DURING and AFTER the behavior
              </td>
            </tr>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top'
              }}>
                {plan.antecedentStrategies.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '8pt', color: colors.textDark }}>
                    {plan.antecedentStrategies.map((strategy, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{strategy}</li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ color: colors.lightItalic, fontStyle: 'italic', fontSize: '8pt' }}>
                    <strong>Examples:</strong>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                      <li>Use visual schedules</li>
                      <li>Offer choices before transitions</li>
                      <li>Provide advance warnings</li>
                      <li>Modify the environment</li>
                      <li>Pre-teach expectations</li>
                    </ul>
                  </div>
                )}
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top'
              }}>
                {plan.replacementBehaviors.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '8pt', color: colors.textDark }}>
                    {plan.replacementBehaviors.map((behavior, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{behavior}</li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ color: colors.lightItalic, fontStyle: 'italic', fontSize: '8pt' }}>
                    <strong>Examples:</strong>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                      <li>Request a break using words/card</li>
                      <li>Ask for help appropriately</li>
                      <li>Use a coping strategy</li>
                      <li>Wait appropriately</li>
                      <li>Transition with visual support</li>
                    </ul>
                  </div>
                )}
              </td>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                verticalAlign: 'top'
              }}>
                {plan.consequenceStrategies.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '8pt', color: colors.textDark }}>
                    {plan.consequenceStrategies.map((strategy, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{strategy}</li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ color: colors.lightItalic, fontStyle: 'italic', fontSize: '8pt' }}>
                    <strong>Examples:</strong>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                      <li>Stay calm, neutral tone</li>
                      <li>Redirect to replacement behavior</li>
                      <li>Avoid reinforcing the behavior</li>
                      <li>Reinforce replacement behavior</li>
                      <li>Ensure safety first</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Additional Notes Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '30px'
        }}>
          <thead>
            <tr>
              <th style={{
                backgroundColor: colors.brown,
                color: colors.white,
                padding: '10px',
                textAlign: 'left',
                fontSize: '13pt',
                fontWeight: 'bold'
              }}>
                Additional Notes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                backgroundColor: colors.white,
                border: '1px solid #DDDDDD',
                padding: '8px',
                minHeight: '100px',
                color: plan.notes ? colors.textDark : colors.lightItalic,
                fontStyle: plan.notes ? 'normal' : 'italic',
                whiteSpace: 'pre-wrap'
              }}>
                {plan.notes || 'Use this space for observations, strategies, or special considerations.'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer Disclaimer */}
        <div style={{
          fontSize: '8pt',
          color: '#8B7355',
          fontStyle: 'italic',
          lineHeight: '1.6',
          paddingTop: '20px',
          borderTop: '1px solid #DDDDDD'
        }}>
          <p style={{ margin: 0 }}>
            This document is a parent guide based on Applied Behavior Analysis (ABA) principles. It is not a substitute
            for professional evaluation, diagnosis, or treatment by a Board Certified Behavior Analyst (BCBA) or other
            licensed professional. If your child exhibits severe behavioral challenges, please consult a qualified professional.
          </p>
        </div>
      </div>
    </>
  );
}
